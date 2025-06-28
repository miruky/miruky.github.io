'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  verifyCredentials,
  createSession,
  encryptPAT,
  isLockedOut,
  getRemainingLockoutSeconds,
} from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pat, setPat] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (isLockedOut()) {
      const sec = getRemainingLockoutSeconds();
      setError(`ログイン試行回数の上限です。${Math.ceil(sec / 60)}分後に再試行してください。`);
      return;
    }

    setLoading(true);
    try {
      const ok = await verifyCredentials(username, password);
      if (!ok) {
        setError('ユーザー名またはパスワードが正しくありません。');
        return;
      }

      // Encrypt PAT if provided
      if (pat.trim()) {
        await encryptPAT(pat.trim(), password);
      }

      createSession();
      router.push('/admin/dashboard/');
    } catch {
      setError('認証処理中にエラーが発生しました。');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-slate-400 text-sm">mirukyのIT備忘録 管理画面</p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="glass-card p-8 space-y-5"
        >
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-1.5">
              ユーザー名
            </label>
            <input
              id="username"
              type="text"
              required
              autoComplete="username"
              className="w-full rounded-lg bg-dark-800 border border-dark-600 px-4 py-2.5 text-white
                         placeholder:text-slate-500 focus:outline-none focus:border-accent-cyan/60
                         focus:ring-1 focus:ring-accent-cyan/40 transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg bg-dark-800 border border-dark-600 px-4 py-2.5 text-white
                         placeholder:text-slate-500 focus:outline-none focus:border-accent-cyan/60
                         focus:ring-1 focus:ring-accent-cyan/40 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* GitHub PAT (optional) */}
          <div>
            <label htmlFor="pat" className="block text-sm font-medium text-slate-300 mb-1.5">
              GitHub PAT
              <span className="text-slate-500 ml-1">(任意 / 記事投稿に必要)</span>
            </label>
            <input
              id="pat"
              type="password"
              autoComplete="off"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className="w-full rounded-lg bg-dark-800 border border-dark-600 px-4 py-2.5 text-white
                         placeholder:text-slate-500 focus:outline-none focus:border-accent-cyan/60
                         focus:ring-1 focus:ring-accent-cyan/40 transition"
              value={pat}
              onChange={(e) => setPat(e.target.value)}
            />
            <p className="mt-1 text-xs text-slate-500">
              fine-grained PAT (contents: write) を使用。AES-GCM で暗号化しローカル保存されます。
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-accent-cyan to-accent-purple
                       py-3 font-semibold text-white transition-all hover:opacity-90
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '認証中...' : 'ログイン'}
          </button>

          {/* Back link */}
          <div className="text-center">
            <a href="/" className="text-sm text-slate-500 hover:text-accent-cyan transition">
              サイトに戻る
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
