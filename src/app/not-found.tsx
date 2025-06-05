import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pt-24 pb-20 min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl font-bold gradient-text-static mb-4">404</div>
        <h1 className="text-2xl font-bold dark:text-white text-slate-900 mb-2">
          Page Not Found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          お探しのページは存在しません
        </p>
        <Link href="/" className="btn-primary">
          Home に戻る
        </Link>
      </div>
    </div>
  );
}
