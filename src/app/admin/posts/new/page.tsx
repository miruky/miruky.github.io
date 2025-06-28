'use client';

import { useState, useCallback, FormEvent } from 'react';
import { decryptPAT, hasPAT } from '@/lib/auth';
import { publishPost, type BlogPostPayload } from '@/lib/github-api';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { FiSend, FiEye, FiEdit3, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [tags, setTags] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [tab, setTab] = useState<'edit' | 'preview'>('edit');
  const [previewHtml, setPreviewHtml] = useState('');
  const [status, setStatus] = useState<'idle' | 'publishing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [patPassword, setPatPassword] = useState('');
  const [showPatDialog, setShowPatDialog] = useState(false);

  // Generate preview
  const renderPreview = useCallback(async () => {
    try {
      const result = await remark().use(remarkHtml).process(body);
      setPreviewHtml(result.toString());
      setTab('preview');
    } catch {
      setPreviewHtml('<p style="color:red">Markdown の変換に失敗しました。</p>');
      setTab('preview');
    }
  }, [body]);

  // Publish
  async function handlePublish(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setMessage('タイトルと本文は必須です。');
      setStatus('error');
      return;
    }

    if (!hasPAT()) {
      setMessage('GitHub PAT が未設定です。ログイン画面で設定してください。');
      setStatus('error');
      return;
    }

    // Prompt for password to decrypt PAT
    setShowPatDialog(true);
  }

  async function doPublish() {
    setShowPatDialog(false);
    setStatus('publishing');

    const pat = await decryptPAT(patPassword);
    if (!pat) {
      setMessage('PAT の復号に失敗しました。パスワードが正しいか確認してください。');
      setStatus('error');
      return;
    }

    const payload: BlogPostPayload = {
      title: title.trim(),
      slug: slug.trim(),
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      excerpt: excerpt.trim(),
      body: body.trim(),
    };

    const result = await publishPost(pat, payload);
    if (result.success) {
      setMessage(`投稿成功! GitHub Actions で自動デプロイされます。`);
      setStatus('success');
    } else {
      setMessage(`投稿失敗: ${result.error}`);
      setStatus('error');
    }
    setPatPassword('');
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white">New Post</h1>
        <p className="text-slate-400 text-sm mt-1">Markdown 記事を作成して GitHub に投稿</p>
      </div>

      {/* Status */}
      {status !== 'idle' && status !== 'publishing' && (
        <div
          className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm ${
            status === 'success'
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              : 'border-red-500/30 bg-red-500/10 text-red-400'
          }`}
        >
          {status === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
          {message}
        </div>
      )}

      <form onSubmit={handlePublish} className="space-y-5">
        {/* Meta fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">タイトル *</label>
            <input
              type="text"
              required
              className="w-full rounded-lg bg-dark-800 border border-dark-600 px-4 py-2.5 text-white
                         focus:outline-none focus:border-accent-cyan/60 transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Slug
              <span className="text-slate-500 ml-1">(空欄でタイトルから自動生成)</span>
            </label>
            <input
              type="text"
              className="w-full rounded-lg bg-dark-800 border border-dark-600 px-4 py-2.5 text-white
                         focus:outline-none focus:border-accent-cyan/60 transition"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="my-first-post"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">タグ (カンマ区切り)</label>
            <input
              type="text"
              className="w-full rounded-lg bg-dark-800 border border-dark-600 px-4 py-2.5 text-white
                         focus:outline-none focus:border-accent-cyan/60 transition"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="AWS, Next.js, AI"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">抜粋</label>
            <input
              type="text"
              className="w-full rounded-lg bg-dark-800 border border-dark-600 px-4 py-2.5 text-white
                         focus:outline-none focus:border-accent-cyan/60 transition"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="記事の概要 (任意)"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-dark-600 pb-px">
          <button
            type="button"
            onClick={() => setTab('edit')}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-t-lg transition ${
              tab === 'edit'
                ? 'bg-dark-700 text-accent-cyan border-b-2 border-accent-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FiEdit3 size={14} /> Editor
          </button>
          <button
            type="button"
            onClick={renderPreview}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-t-lg transition ${
              tab === 'preview'
                ? 'bg-dark-700 text-accent-cyan border-b-2 border-accent-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FiEye size={14} /> Preview
          </button>
        </div>

        {/* Editor / Preview */}
        {tab === 'edit' ? (
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="# Hello World&#10;&#10;Markdown で記事を書きましょう..."
            className="w-full h-[500px] rounded-lg bg-dark-800 border border-dark-600 px-4 py-3
                       text-white font-mono text-sm leading-relaxed resize-y
                       focus:outline-none focus:border-accent-cyan/60 transition"
          />
        ) : (
          <div
            className="w-full min-h-[500px] rounded-lg bg-dark-800 border border-dark-600 px-6 py-4
                       prose prose-invert prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={status === 'publishing'}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSend size={16} />
            {status === 'publishing' ? '投稿中...' : '投稿する'}
          </button>
        </div>
      </form>

      {/* PAT Password Dialog */}
      {showPatDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="glass-card p-6 w-full max-w-sm space-y-4">
            <h3 className="text-white font-semibold">パスワード確認</h3>
            <p className="text-sm text-slate-400">GitHub PAT を復号するために、パスワードを入力してください。</p>
            <input
              type="password"
              autoFocus
              className="w-full rounded-lg bg-dark-800 border border-dark-600 px-4 py-2.5 text-white
                         focus:outline-none focus:border-accent-cyan/60 transition"
              value={patPassword}
              onChange={(e) => setPatPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') doPublish();
              }}
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => { setShowPatDialog(false); setPatPassword(''); }}
                className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white transition"
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={doPublish}
                className="px-4 py-2 rounded-lg bg-accent-cyan/20 text-accent-cyan text-sm font-medium hover:bg-accent-cyan/30 transition"
              >
                送信
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
