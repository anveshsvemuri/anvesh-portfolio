function Footer() {
  return (
    <footer className="border-t border-slate-800 px-6 py-8">
      <div className="mx-auto max-w-6xl text-sm text-slate-400">
        © {new Date().getFullYear()} Anvesh Sai Vemuri. Built with React, Vite, and Tailwind CSS.
      </div>
    </footer>
  );
}

export default Footer;