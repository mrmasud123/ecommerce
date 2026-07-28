export default function Newsletter() {
    return (
        <section className="bg-ink">
            <div className="rounded-b-[50px] bg-white sm:rounded-b-[80px]">
                <div className="container-x py-16 text-center">
                    <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
                        Subscribe to our newsletter
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-gray-500">
                        Stay updated! Subscribe to our mailing list for news, updates, and
                        exclusive offers.
                    </p>

                    <form className="mx-auto mt-8 flex max-w-lg items-center gap-2 rounded-full border border-gray-200 bg-white p-1.5 pl-5 shadow-sm">
                        <div className="flex flex-1 flex-col items-start text-left">
                            <label htmlFor="newsletter-email" className="text-xs text-gray-400">
                                Enter your email
                            </label>
                            <div className="flex w-full items-center gap-2">
                                <MailIcon />
                                <input
                                    id="newsletter-email"
                                    type="email"
                                    placeholder=""
                                    className="w-full border-0 bg-transparent text-sm outline-none placeholder:text-gray-400"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="shrink-0 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink/90"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

function MailIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
        >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );
}