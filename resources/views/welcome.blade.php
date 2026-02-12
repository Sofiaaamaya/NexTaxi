<!DOCTYPE html>
<html class="dark" lang="en">

<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>NexTaxi - Passenger Booking Dashboard</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
        rel="stylesheet" />
    <link href="https://fonts.googleapis.com" rel="preconnect" />
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap"
        rel="stylesheet" />
    <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
        rel="stylesheet" />
    <script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#137fec",
                        "primary-dark": "#0b5cb5",
                        "accent": "#ff9f1c", // High contrast orange for focus/alerts
                        "background-light": "#f6f7f8",
                        "background-dark": "#101922",
                        "surface-dark": "#1c242c",
                        "surface-light": "#ffffff",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "1rem",
                        "lg": "2rem",
                        "xl": "3rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
    <style>
        /* Custom focus styles for accessibility */
        *:focus-visible {
            outline: 3px solid #ff9f1c !important;
            outline-offset: 2px !important;
        }

        /* Map pattern simulation */
        .map-pattern-dots {
            background-image: radial-gradient(#3b4754 1.5px, transparent 1.5px);
            background-size: 12px 12px;
        }

        .map-pattern-hatch {
            background: repeating-linear-gradient(45deg,
                    rgba(59, 71, 84, 0.3),
                    rgba(59, 71, 84, 0.3) 10px,
                    rgba(59, 71, 84, 0.1) 10px,
                    rgba(59, 71, 84, 0.1) 20px);
        }
    </style>
</head>

<body
    class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden h-screen flex flex-col">
    <!-- Skip to main content for accessibility -->
    <a class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-accent text-black font-bold px-4 py-2 rounded-lg"
        href="#main-content">Skip to main content</a>

    <!-- Top Navigation -->
    <header
        class="flex-none flex items-center justify-between border-b border-gray-200 dark:border-[#283039] px-6 py-4 bg-surface-light dark:bg-[#111418] z-20">
        <div class="flex items-center gap-4 text-slate-900 dark:text-white">
            <div class="size-8 text-primary">
                <svg aria-hidden="true" class="w-full h-full" fill="none" viewbox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                        fill="currentColor"></path>
                </svg>
            </div>
            <h1 class="text-xl font-bold tracking-tight">NexTaxi</h1>
        </div>

        <div class="flex items-center gap-4">
            @if (Route::has('login'))
            @auth
            <!-- Notifications -->
            <button aria-label="Notifications"
                class="size-11 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#283039] hover:bg-gray-200 dark:hover:bg-[#3b4754] transition-colors relative">
                <span aria-hidden="true" class="material-symbols-outlined">notifications</span>
                <span class="absolute top-2 right-2 size-2.5 bg-red-500 rounded-full border-2 border-[#283039]"></span>
            </button>

            <!-- Profile -->
            <a href="{{ url('/dashboard') }}" aria-label="User Profile"
                class="flex items-center gap-2 pl-2 pr-4 h-11 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors">
                <div class="bg-center bg-no-repeat bg-cover rounded-full size-8 bg-white"
                    data-alt="User profile picture"
                    style='background-image: url("https://ui-avatars.com/api/?name={{ urlencode(Auth::user()->name) }}&background=random");'>
                </div>
                <span class="text-sm font-bold">{{ Auth::user()->name }}</span>
            </a>
            @else
            <!-- Login -->
            <a href="{{ route('login') }}"
                class="flex items-center justify-center h-11 px-6 bg-gray-100 dark:bg-[#283039] rounded-full text-sm font-bold hover:bg-gray-200 dark:hover:bg-[#3b4754] transition-colors focus:ring-2 focus:ring-accent dark:text-white">
                Log in
            </a>

            <!-- Register -->
            @if (Route::has('register'))
            <a href="{{ route('register') }}"
                class="flex items-center justify-center h-11 px-6 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary-dark transition-colors focus:ring-2 focus:ring-accent">
                Register
            </a>
            @endif
            @endauth
            @endif
        </div>
    </header>

</html>