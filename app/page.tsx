'use client';

import { useState, useEffect } from 'react';
import { getCharacters, getDailyQuests, getMainQuests, getSideQuests } from '@/lib/notion';

interface Character {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  rarity: string;
  price: number;
  isFreeVersion: boolean;
}

interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  category: string;
  isActive: boolean;
}

export default function Dashboard() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [dailyQuests, setDailyQuests] = useState<Quest[]>([]);
  const [mainQuests, setMainQuests] = useState<Quest[]>([]);
  const [sideQuests, setSideQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandAttributes, setExpandAttributes] = useState(false);
  const [timerTime, setTimerTime] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [chars, daily, main, side] = await Promise.all([
          getCharacters(),
          getDailyQuests(),
          getMainQuests(),
          getSideQuests(),
        ]);

        const freeChar = chars.find((c) => c.isFreeVersion) || chars[0];
        setCharacter(freeChar);
        setDailyQuests(daily);
        setMainQuests(main);
        setSideQuests(side);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!timerRunning) return;

    const interval = setInterval(() => {
      setTimerTime((prev) => {
        if (prev <= 0) {
          setTimerRunning(false);
          return 25 * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">⚔️ Gamified Life RPG</h1>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Character Panel */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{character?.name}</h2>
              <button
                onClick={() => setExpandAttributes(!expandAttributes)}
                className="text-gray-400 hover:text-white text-xl"
              >
                {expandAttributes ? '▼' : '►'}
              </button>
            </div>

            <div className="w-full aspect-square bg-gray-700 rounded-lg mb-4 flex items-center justify-center text-6xl">
              🎮
            </div>

            <div className="text-sm text-gray-400 mb-2">Level 12</div>
            <div className="w-full bg-gray-700 rounded h-2 mb-1">
              <div className="bg-green-500 h-full rounded" style={{ width: '62%' }}></div>
            </div>
            <div className="text-sm text-gray-400 mb-4">650/1000 XP</div>

            {expandAttributes && (
              <div className="space-y-2 border-t border-gray-700 pt-4">
                {[
                  { label: 'Strength', value: 15, percent: 75 },
                  { label: 'Endurance', value: 13, percent: 68 },
                  { label: 'Focus', value: 12, percent: 62 },
                  { label: 'Discipline', value: 11, percent: 58 },
                ].map((attr) => (
                  <div key={attr.label} className="flex items-center gap-2 text-xs">
                    <span className="flex-shrink-0 w-20">{attr.label}</span>
                    <div className="flex-1 bg-gray-700 rounded h-1">
                      <div
                        className="bg-green-500 h-full rounded"
                        style={{ width: `${attr.percent}%` }}
                      ></div>
                    </div>
                    <span className="font-bold w-6">{attr.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats Indicator */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 flex flex-col items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-gradient-to-r from-green-500 to-blue-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-400">62%</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-4">Overall Balance</p>
          </div>

          {/* Quests Overview */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4">📋 Quest Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Daily</span>
                <span className="text-green-400 font-bold">{dailyQuests.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Main</span>
                <span className="text-blue-400 font-bold">{mainQuests.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Side</span>
                <span className="text-purple-400 font-bold">{sideQuests.length}</span>
              </div>
              <div className="border-t border-gray-700 pt-3 mt-3 flex justify-between font-bold">
                <span>Total XP</span>
                <span className="text-yellow-400">
                  {(
                    dailyQuests.reduce((sum, q) => sum + q.xpReward, 0) +
                    mainQuests.reduce((sum, q) => sum + q.xpReward, 0) +
                    sideQuests.reduce((sum, q) => sum + q.xpReward, 0)
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quest Sections */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-bold mb-4 text-green-400">Daily Quests</h3>
            <div className="space-y-2">
              {dailyQuests.map((quest) => (
                <div key={quest.id} className="bg-gray-700 p-3 rounded text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold">{quest.title}</span>
                    <span className="text-green-400">+{quest.xpReward} XP</span>
                  </div>
                  <span className="text-xs bg-gray-600 px-2 py-1 rounded">{quest.category}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-bold mb-4 text-blue-400">Main Quests</h3>
            <div className="space-y-2">
              {mainQuests.map((quest) => (
                <div key={quest.id} className="bg-gray-700 p-3 rounded text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold">{quest.title}</span>
                    <span className="text-blue-400">+{quest.xpReward} XP</span>
                  </div>
                  <span className="text-xs bg-gray-600 px-2 py-1 rounded">{quest.category}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-bold mb-4 text-purple-400">Side Quests</h3>
            <div className="space-y-2">
              {sideQuests.map((quest) => (
                <div key={quest.id} className="bg-gray-700 p-3 rounded text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold">{quest.title}</span>
                    <span className="text-purple-400">+{quest.xpReward} XP</span>
                  </div>
                  <span className="text-xs bg-gray-600 px-2 py-1 rounded">{quest.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pomodoro Timer */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-4">⏱️ Focus Session (Pomodoro)</h3>
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <div className="text-5xl font-mono font-bold text-green-400 text-center mb-4">
                {formatTime(timerTime)}
              </div>
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded transition"
              >
                {timerRunning ? 'Pause Focus' : 'Start Focus'}
              </button>
            </div>
            <div className="text-right">
              <p className="text-gray-400 mb-2">Status</p>
              <div className="text-3xl">{timerRunning ? '🎯' : '✨'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
