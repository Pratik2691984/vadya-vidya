import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { RAGA_LIBRARY, TALA_LIBRARY, WORLD_GRIDS } from './data.js';
const { createElement: h } = React;

function cleanLyricsText(raw) {
  if (!raw) return '';
  return raw.split('\n').map(line => line
    .replace(/\[.*?\]/g, '')
    .replace(/\(.*?\)/g, '')
    .replace(/\{.*?\}/g, '')
    .replace(/<.*?>/g, '')
    .trim()
  ).filter(Boolean).join('\n');
}

function formatCleanStructuredLyrics(rawLyrics, targetChars = 4500) {
  const clean = cleanLyricsText(rawLyrics);
  const lines = clean.split('\n').filter(Boolean);
  if (!lines.length) return '[Sthayi]\n(Provide lyrics in input)';
  const sthayi = lines.slice(0, Math.min(4, lines.length)).join('\n');
  const antara = lines.slice(Math.min(4, lines.length)).join('\n') || sthayi;
  let expanded = '[Sthayi]\n' + sthayi + '\n\n[Antara]\n' + antara;
  let count = 2;
  while (expanded.length < Math.min(targetChars, 3000) && count < 6) {
    expanded += '\n\n[Sanchari ' + count + ']\n' + antara + '\n\n[Abhog ' + count + ']\n' + sthayi;
    count++;
  }
  return expanded.slice(0, 5000);
}

function buildStylePrompt(raga, tala, bpm, tradition, cavityQ) {
  const rd = RAGA_LIBRARY[raga] || { thaat: 'Classical', vadi: '1/1', samvadi: '3/2', rasa: 'Devotional' };
  const td = TALA_LIBRARY[tala] || { beats: 8, theka: 'Theka cycle' };
  return [
    'Classical ' + (tradition || 'Hindustani') + ' recital.',
    'Raga/Athan: ' + raga + ' (' + rd.thaat + '). Vadi: ' + rd.vadi + ', Samvadi: ' + rd.samvadi + '. Rasa: ' + rd.rasa + '.',
    'Tala/Meter: ' + tala + ' (' + td.beats + ' beats) at ' + bpm + ' BPM.',
    'Acoustics: 22-Sruti Just Intonation and non-tempered grid.',
    'Instrumentation: Resonant Tanpura root drone (Sa-Pa 3/2), Bumbung cavity resonator filter (Q=' + cavityQ.toFixed(1) + '),',
    'Avanaddha percussion (' + td.theka + '), and acoustic bamboo lead flute.',
    'Performance: Strict microtonal inflection, vocal meend, and Euler-Bernoulli transient rejection.'
  ].join(' ').slice(0, 1000);
}

function App() {
  const [audioReady, setAudioReady] = useState(false);
  const [activeTab, setActiveTab] = useState('studio');
  const [selectedRaga, setSelectedRaga] = useState('Bhoopali');
  const [selectedTala, setSelectedTala] = useState('Keherwa');
  const [tempo] = useState(76);
  const [cavityQ, setCavityQ] = useState(14.0);
  const [lyricsText, setLyricsText] = useState('Evening sky with stars.\nListen beloved to my word.\nLove and longing in the heart.\nI repeat the name of Hari day and night.');
  const [tanpuraOn, setTanpuraOn] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const audioCtx = useRef(null);
  const tanpuraNodes = useRef(null);

  const initAudio = useCallback(async () => {
    if (!audioCtx.current) audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.current.state === 'suspended') await audioCtx.current.resume();
    setAudioReady(true);
  }, []);

  const playTone = useCallback((freq, customQ) => {
    const ctx = audioCtx.current;
    if (!ctx || ctx.state !== 'running') return;
    const now = ctx.currentTime;
    const q = customQ !== undefined ? customQ : cavityQ;
    const bumbung = ctx.createBiquadFilter();
    bumbung.type = 'bandpass';
    bumbung.frequency.setValueAtTime(freq, now);
    bumbung.Q.setValueAtTime(q, now);
    bumbung.connect(ctx.destination);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.35, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    osc.connect(gain);
    gain.connect(bumbung);
    osc.start(now);
    osc.stop(now + 1.25);
    const inh = ctx.createOscillator();
    const ig = ctx.createGain();
    inh.type = 'sine';
    inh.frequency.setValueAtTime(freq * 2.756, now);
    const strikeLevel = q > 5.0 ? 0.04 : 0.45;
    ig.gain.setValueAtTime(0.0001, now);
    ig.gain.exponentialRampToValueAtTime(strikeLevel, now + 0.004);
    ig.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
    inh.connect(ig);
    ig.connect(ctx.destination);
    inh.start(now);
    inh.stop(now + 0.06);
  }, [cavityQ]);

  useEffect(() => {
    if (!audioCtx.current || !tanpuraOn) {
      if (tanpuraNodes.current) {
        try { tanpuraNodes.current.oscs.forEach(o => o.stop()); } catch (e) {}
        tanpuraNodes.current = null;
      }
      return;
    }
    const ctx = audioCtx.current;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.2, ctx.currentTime);
    master.connect(ctx.destination);
    const sa = 130.81;
    const freqs = [sa * 0.75, sa, sa, sa * 2];
    const oscs = freqs.map((f, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = i === 0 ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime);
      g.gain.setValueAtTime(0.08 / (i + 1), ctx.currentTime);
      osc.connect(g);
      g.connect(master);
      osc.start();
      return osc;
    });
    tanpuraNodes.current = { oscs, master };
    return () => { try { oscs.forEach(o => o.stop()); } catch (e) {} };
  }, [tanpuraOn]);

  const stylePrompt = buildStylePrompt(selectedRaga, selectedTala, tempo, RAGA_LIBRARY[selectedRaga] && RAGA_LIBRARY[selectedRaga].desc, cavityQ);
  const cleanLyrics = formatCleanStructuredLyrics(lyricsText, 4500);
  const negativePrompt = 'electronic, autotune, synth, modern pop drums, 808 bass, EDM riser, distorted guitar, artificial reverb, lo-fi hiss, Western tempered chords, clipping'.slice(0, 200);

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(id);
      setTimeout(() => setCopyStatus(''), 2000);
    } catch (e) {}
  };

  const pitchSet = selectedRaga === 'BurmeseAthan' ? WORLD_GRIDS.burma7.pitches : selectedRaga === 'ShashmaqamRast' ? WORLD_GRIDS.shashmaqam17.pitches : [
    { key: 'S', cents: 0, sol: 'Sa', ratio: 1 },
    { key: 'R2', cents: 204, sol: 'Re', ratio: 9/8 },
    { key: 'G1', cents: 386, sol: 'Ga', ratio: 5/4 },
    { key: 'P', cents: 702, sol: 'Pa', ratio: 3/2 },
    { key: 'D1', cents: 884, sol: 'Dha', ratio: 5/3 },
    { key: "S'", cents: 1200, sol: "Sa'", ratio: 2 }
  ];

  if (!audioReady) {
    return h('div', { className: 'min-h-screen flex flex-col items-center justify-center text-center px-6 py-12', style: { background: 'linear-gradient(180deg,#42141c,#12050b 80%)' } }, [
      h('span', { className: 'tracking-[0.25em] text-xs text-[#c9a227] uppercase font-semibold' }, 'Universal Musicological Studio v15'),
      h('h1', { className: 'text-3xl md:text-5xl font-bold text-[#f6ead2] mt-3 mb-4' }, 'Vadya Vidya'),
      h('p', { className: 'max-w-xl text-[#d4b896] text-sm leading-relaxed mb-8' }, 'Burmese Hsaing Waing · Shashmaqam 17-Parda · 22-Sruti JI · Bumbung Cavity Resonator · Clean Lyrics Engine.'),
      h('button', { onClick: initAudio, className: 'btn btn-primary px-8 py-3.5 text-base font-bold shadow-xl cursor-pointer' }, 'Enter Studio')
    ]);
  }

  return h('div', { className: 'min-h-screen bg-[#12050b] text-[#f6ead2]' }, [
    h('header', { className: 'sticky top-0 z-20 glass border-b border-[#42141c] px-4 py-2 flex justify-between items-center' }, [
      h('div', { className: 'header-tabs' }, [
        h('button', { className: 'header-tab ' + (activeTab === 'studio' ? 'active' : ''), onClick: () => setActiveTab('studio') }, 'Master Studio'),
        h('button', { className: 'header-tab ' + (activeTab === 'dispatch' ? 'active' : ''), onClick: () => setActiveTab('dispatch') }, 'Clean Prompts')
      ]),
      h('button', { onClick: () => setTanpuraOn(!tanpuraOn), className: 'btn text-xs ' + (tanpuraOn ? 'btn-green' : 'btn-ghost') }, tanpuraOn ? 'Drone Active' : 'Start Drone')
    ]),
    h('main', { className: 'max-w-7xl mx-auto px-4 pt-4' }, [
      activeTab === 'studio' && h('div', { className: 'space-y-4' }, [
        h('section', { className: 'bg-[#1c0810] border border-[#691e2a] rounded-xl p-3 md:p-4' }, [
          h('div', { className: 'flex justify-between items-center mb-2' }, [
            h('span', { className: 'text-xs font-bold text-[#c9a227] tracking-wider' }, 'A/B ACOUSTIC SWITCHBOARD'),
            h('span', { className: 'text-[10px] font-mono text-[#22c55e]' }, 'Q: ' + cavityQ.toFixed(1) + ' · 130.81 Hz')
          ]),
          h('div', { className: 'grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs mb-3' }, [
            h('button', { onClick: () => { setCavityQ(14.0); playTone(130.81, 14.0); }, className: 'btn btn-ghost text-left' }, 'Slot A: Tuned Tube (Q=14)'),
            h('button', { onClick: () => { setCavityQ(1.2); playTone(130.81, 1.2); }, className: 'btn btn-ghost text-left' }, 'Slot B: Uncoupled Slab (Q=1.2)'),
            h('button', { onClick: () => { playTone(130.81, 14.0); setTimeout(() => playTone(130.81, 1.2), 800); }, className: 'btn btn-primary font-bold' }, 'Compare A to B')
          ]),
          h('div', { className: 'flex items-center gap-3 text-xs bg-[#12050b] p-2 rounded-lg border border-[#42141c]' }, [
            h('span', { className: 'text-[#d4b896] shrink-0' }, 'Cavity Q-Factor:'),
            h('input', { type: 'range', min: 1, max: 25, step: 0.5, value: cavityQ, onChange: e => setCavityQ(parseFloat(e.target.value)), className: 'flex-1' }),
            h('span', { className: 'font-mono text-[#c9a227] font-bold w-10 text-right' }, cavityQ.toFixed(1))
          ])
        ]),
        h('div', { className: 'grid grid-cols-1 md:grid-cols-12 gap-4' }, [
          h('div', { className: 'md:col-span-6 space-y-3' }, [
            h('div', { className: 'bg-[#1c0810] border border-[#42141c] rounded-xl p-3' }, [
              h('label', { className: 'text-xs font-bold text-[#c9a227] block mb-2' }, 'SELECT TRADITION'),
              h('div', { className: 'flex flex-wrap gap-1.5' }, [
                h('button', { onClick: () => { setSelectedRaga('BurmeseAthan'); setSelectedTala('SiWa'); }, className: 'btn text-xs ' + (selectedRaga === 'BurmeseAthan' ? 'btn-primary' : 'btn-ghost') }, 'Burmese'),
                h('button', { onClick: () => { setSelectedRaga('ShashmaqamRast'); setSelectedTala('UsulSaraxbor'); }, className: 'btn text-xs ' + (selectedRaga === 'ShashmaqamRast' ? 'btn-primary' : 'btn-ghost') }, 'Shashmaqam'),
                h('button', { onClick: () => { setSelectedRaga('Bhoopali'); setSelectedTala('Keherwa'); }, className: 'btn text-xs ' + (selectedRaga === 'Bhoopali' ? 'btn-primary' : 'btn-ghost') }, 'Bhoopali'),
                h('button', { onClick: () => { setSelectedRaga('Yaman'); setSelectedTala('Tintal'); }, className: 'btn text-xs ' + (selectedRaga === 'Yaman' ? 'btn-primary' : 'btn-ghost') }, 'Yaman')
              ])
            ]),
            h('div', { className: 'bg-[#1c0810] border border-[#42141c] rounded-xl p-3' }, [
              h('label', { className: 'text-xs font-bold text-[#c9a227] block mb-2' }, 'PITCH CHIPS'),
              h('div', { className: 'grid grid-cols-4 gap-1.5' }, pitchSet.map(p => h('button', { key: p.key, onClick: () => playTone(130.81 * p.ratio), className: 'p-1.5 bg-[#12050b] border border-[#42141c] rounded text-center' }, [
                h('div', { className: 'text-xs font-bold text-[#c9a227]' }, p.key),
                h('div', { className: 'text-[9px] text-[#d4b896]' }, String(p.cents) + 'c'),
                h('div', { className: 'text-[8px] text-[#22c55e] truncate' }, p.sol)
              ])))
            ])
          ]),
          h('div', { className: 'md:col-span-6' }, [
            h('div', { className: 'bg-[#1c0810] border border-[#42141c] rounded-xl p-3' }, [
              h('label', { className: 'text-xs font-bold text-[#c9a227] block mb-1' }, 'SOURCE LYRICS INPUT'),
              h('textarea', { rows: 8, value: lyricsText, onChange: e => setLyricsText(e.target.value), className: 'w-full bg-[#12050b] text-xs font-mono border border-[#42141c] rounded p-2 text-[#ede2d3]' }),
              h('div', { className: 'flex justify-between items-center text-[10px] text-[#d4b896] mt-2' }, [
                h('span', null, 'Raw Length: ' + lyricsText.length + ' chars'),
                h('button', { onClick: () => setActiveTab('dispatch'), className: 'btn btn-primary text-xs' }, 'Generate Prompts')
              ])
            ])
          ])
        ])
      ]),
      activeTab === 'dispatch' && h('div', { className: 'space-y-4' }, [
        h('div', { className: 'flex justify-between items-center' }, [
          h('h2', { className: 'text-lg font-bold text-[#c9a227]' }, 'STANDARDIZED AI GENERATION DISPATCH'),
          h('button', { onClick: () => setActiveTab('studio'), className: 'btn btn-ghost text-xs' }, 'Back to Studio')
        ]),
        h('div', { className: 'bg-[#1c0810] border border-[#42141c] rounded-xl p-4' }, [
          h('div', { className: 'flex justify-between items-center mb-1' }, [
            h('span', { className: 'text-xs font-bold text-[#c9a227]' }, '1. STYLE DISPATCH (1000 Chars)'),
            h('button', { onClick: () => copyToClipboard(stylePrompt, 'style'), className: 'btn btn-ghost text-[10px] py-0.5' }, copyStatus === 'style' ? 'Copied' : stylePrompt.length + '/1000 Copy')
          ]),
          h('pre', { className: 'bg-[#12050b] p-2.5 rounded text-xs font-mono whitespace-pre-wrap text-[#d4b896]' }, stylePrompt)
        ]),
        h('div', { className: 'bg-[#1c0810] border border-[#42141c] rounded-xl p-4' }, [
          h('div', { className: 'flex justify-between items-center mb-1' }, [
            h('span', { className: 'text-xs font-bold text-[#c9a227]' }, '2. CLEAN STRUCTURED LYRICS (5000 Chars)'),
            h('button', { onClick: () => copyToClipboard(cleanLyrics, 'lyrics'), className: 'btn btn-ghost text-[10px] py-0.5' }, copyStatus === 'lyrics' ? 'Copied' : cleanLyrics.length + '/5000 Copy')
          ]),
          h('pre', { className: 'bg-[#12050b] p-2.5 rounded text-xs font-mono whitespace-pre-wrap text-[#f6ead2] max-h-80 overflow-y-auto' }, cleanLyrics)
        ]),
        h('div', { className: 'bg-[#1c0810] border border-[#42141c] rounded-xl p-4' }, [
          h('div', { className: 'flex justify-between items-center mb-1' }, [
            h('span', { className: 'text-xs font-bold text-[#c9a227]' }, '3. NEGATIVE PROMPT (200 Chars)'),
            h('button', { onClick: () => copyToClipboard(negativePrompt, 'neg'), className: 'btn btn-ghost text-[10px] py-0.5' }, copyStatus === 'neg' ? 'Copied' : negativePrompt.length + '/200 Copy')
          ]),
          h('pre', { className: 'bg-[#12050b] p-2.5 rounded text-xs font-mono whitespace-pre-wrap text-[#ef4444]' }, negativePrompt)
        ])
      ])
    ]),
    h('div', { className: 'fixed-footer' }, [
      h('button', { onClick: () => playTone(130.81, 14.0), className: 'btn btn-ghost text-xs' }, 'Strike 130.81 Hz'),
      h('button', { onClick: () => setTanpuraOn(!tanpuraOn), className: 'btn text-xs ' + (tanpuraOn ? 'btn-green' : 'btn-primary') }, tanpuraOn ? 'Stop Drone' : 'Tanpura Drone'),
      h('span', { className: 'pingal-badge text-[10px]' }, 'Bumbung Q: ' + cavityQ.toFixed(1))
    ])
  ]);
}

createRoot(document.getElementById('root')).render(h(React.StrictMode, null, h(App)));
