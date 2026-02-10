<!DOCTYPE html>
<html class="dark" lang="en">

<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>Passenger Booking Dashboard</title>
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
            <h1 class="text-xl font-bold tracking-tight">TaxiAccess</h1>
        </div>

        <div class="flex items-center gap-4">
            <!-- Accessibility Shortcut Menu -->
            <button aria-label="Accessibility options"
                class="flex items-center justify-center h-11 px-4 bg-gray-100 dark:bg-[#283039] rounded-full text-sm font-bold hover:bg-gray-200 dark:hover:bg-[#3b4754] transition-colors focus:ring-2 focus:ring-accent">
                <span aria-hidden="true" class="material-symbols-outlined mr-2">accessibility_new</span>
                <span>A11y Menu</span>
            </button>

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

    <!-- Main Layout -->
    <main class="flex flex-1 overflow-hidden relative" id="main-content">
        <!-- Sidebar (Booking Panel) -->
        <aside
            class="w-full md:w-[450px] flex-none flex flex-col bg-white dark:bg-[#161b22] border-r border-gray-200 dark:border-[#283039] overflow-y-auto z-10 shadow-xl">
            <div class="p-6 flex flex-col gap-6 h-full">
                <div>
                    <h2 class="text-2xl font-bold mb-6">Book a Ride</h2>
                    <!-- Journey Inputs -->
                    <div class="flex flex-col gap-4 relative">
                        <!-- Connector Line -->
                        <div aria-hidden="true"
                            class="absolute left-7 top-10 bottom-10 w-0.5 bg-gray-300 dark:bg-[#3b4754] -z-0"></div>

                        <div class="relative z-10 group">
                            <label class="sr-only" for="pickup-location">Pick-up Location</label>
                            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                                <span aria-hidden="true" class="material-symbols-outlined filled">trip_origin</span>
                            </div>
                            <input aria-required="true"
                                class="w-full pl-12 pr-4 h-14 rounded-xl bg-gray-50 dark:bg-[#1c2127] border-2 border-gray-200 dark:border-[#3b4754] focus:border-primary focus:ring-0 text-base font-medium placeholder:text-gray-400 dark:text-white transition-all"
                                id="pickup-location" type="text" value="Current Location" />
                        </div>

                        <div class="relative z-10 group">
                            <label class="sr-only" for="dropoff-location">Drop-off Destination</label>
                            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-accent">
                                <span aria-hidden="true" class="material-symbols-outlined filled">location_on</span>
                            </div>
                            <input aria-required="true"
                                class="w-full pl-12 pr-4 h-14 rounded-xl bg-gray-50 dark:bg-[#1c2127] border-2 border-gray-200 dark:border-[#3b4754] focus:border-primary focus:ring-0 text-base font-medium placeholder:text-gray-400 dark:text-white transition-all"
                                id="dropoff-location" placeholder="Enter destination" type="text" />
                        </div>
                    </div>
                </div>

                <!-- Vehicle Selection -->
                <fieldset class="flex flex-col gap-3">
                    <legend class="text-base font-bold mb-3 dark:text-gray-200">Select Vehicle Type</legend>
                    <label
                        class="relative flex items-center p-4 rounded-xl border-2 border-gray-200 dark:border-[#3b4754] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1c2127] has-[:checked]:border-primary has-[:checked]:bg-blue-50/50 dark:has-[:checked]:bg-[#137fec]/10 transition-all group focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 dark:focus-within:ring-offset-[#161b22]">
                        <input checked="" class="sr-only" name="vehicle" type="radio" />
                        <div
                            class="bg-gray-200 dark:bg-[#283039] p-2 rounded-lg mr-4 group-has-[:checked]:bg-primary group-has-[:checked]:text-white transition-colors">
                            <span aria-hidden="true" class="material-symbols-outlined">local_taxi</span>
                        </div>
                        <div class="flex-1">
                            <div class="font-bold text-lg">Standard</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">4 seats • Best value</div>
                        </div>
                        <div class="text-right">
                            <div class="font-bold text-lg">$12.50</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">3 min</div>
                        </div>
                    </label>

                    <label
                        class="relative flex items-center p-4 rounded-xl border-2 border-gray-200 dark:border-[#3b4754] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1c2127] has-[:checked]:border-primary has-[:checked]:bg-blue-50/50 dark:has-[:checked]:bg-[#137fec]/10 transition-all group focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 dark:focus-within:ring-offset-[#161b22]">
                        <input class="sr-only" name="vehicle" type="radio" />
                        <div
                            class="bg-gray-200 dark:bg-[#283039] p-2 rounded-lg mr-4 group-has-[:checked]:bg-primary group-has-[:checked]:text-white transition-colors">
                            <span aria-hidden="true" class="material-symbols-outlined">accessible</span>
                        </div>
                        <div class="flex-1">
                            <div class="font-bold text-lg">Accessible</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">Wheelchair ramp + Assist</div>
                        </div>
                        <div class="text-right">
                            <div class="font-bold text-lg">$14.00</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">8 min</div>
                        </div>
                    </label>

                    <label
                        class="relative flex items-center p-4 rounded-xl border-2 border-gray-200 dark:border-[#3b4754] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1c2127] has-[:checked]:border-primary has-[:checked]:bg-blue-50/50 dark:has-[:checked]:bg-[#137fec]/10 transition-all group focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 dark:focus-within:ring-offset-[#161b22]">
                        <input class="sr-only" name="vehicle" type="radio" />
                        <div
                            class="bg-gray-200 dark:bg-[#283039] p-2 rounded-lg mr-4 group-has-[:checked]:bg-primary group-has-[:checked]:text-white transition-colors">
                            <span aria-hidden="true" class="material-symbols-outlined">airport_shuttle</span>
                        </div>
                        <div class="flex-1">
                            <div class="font-bold text-lg">XL Van</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">6 seats • Extra luggage</div>
                        </div>
                        <div class="text-right">
                            <div class="font-bold text-lg">$18.50</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">12 min</div>
                        </div>
                    </label>
                </fieldset>

                <div class="mt-auto pt-6 border-t border-gray-200 dark:border-[#283039]">
                    <!-- Fare Estimate Summary -->
                    <div class="flex justify-between items-end mb-6">
                        <div>
                            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">Estimated Total</div>
                            <div class="text-3xl font-black tracking-tight text-slate-900 dark:text-white">$12.50 -
                                $14.00</div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">Wait time</div>
                            <div class="text-xl font-bold text-primary">~8 min</div>
                        </div>
                    </div>

                    <!-- Primary Action Button -->
                    <button
                        class="w-full h-14 bg-primary hover:bg-primary-dark text-white rounded-full font-bold text-lg tracking-wide shadow-lg shadow-blue-900/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group focus:ring-4 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-[#161b22]">
                        <span>Request Taxi</span>
                        <span aria-hidden="true"
                            class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                    <p class="text-xs text-center mt-4 text-gray-400">
                        By requesting, you agree to our <a
                            class="underline hover:text-primary focus:text-accent focus:no-underline" href="#">Terms of
                            Service</a>.
                    </p>
                </div>
            </div>
        </aside>

        <!-- Map Area -->
        <section aria-label="Interactive Map showing current route"
            class="flex-1 relative bg-[#1c2127] overflow-hidden">
            <!-- Map Background Layer (Simulated) -->
            <div class="absolute inset-0 z-0">
                <!-- Base Dark Map Color -->
                <div class="absolute inset-0 bg-[#15191e]"></div>
                <!-- Zone 1: Dotted Pattern (Park/Pedestrian) -->
                <div class="absolute top-0 right-0 w-1/3 h-full map-pattern-dots opacity-30 pointer-events-none"></div>
                <!-- Zone 2: Hatch Pattern (Industrial/No-go) -->
                <div class="absolute bottom-0 left-1/3 w-1/4 h-1/3 map-pattern-hatch opacity-20 pointer-events-none">
                </div>
                <!-- Main Roads -->
                <div class="absolute top-1/2 left-0 w-full h-4 bg-[#2c333c] transform -rotate-12 translate-y-20"></div>
                <div class="absolute top-0 left-1/2 h-full w-4 bg-[#2c333c] transform rotate-12 -translate-x-20"></div>

                <!-- Route Line (High Contrast Blue) -->
                <svg class="absolute inset-0 w-full h-full pointer-events-none z-10"
                    style="filter: drop-shadow(0px 0px 4px rgba(0,0,0,0.5));">
                    <path d="M 225 450 Q 400 350 550 400 T 800 300" fill="none" stroke="#137fec" stroke-dasharray="10 0"
                        stroke-linecap="round" stroke-width="8"></path>
                    <!-- Route directional arrows simulation -->
                    <circle cx="225" cy="450" fill="#137fec" fill-opacity="0.3" r="12"></circle>
                </svg>

                <!-- Markers -->
                <!-- Pickup Marker -->
                <div
                    class="absolute left-[225px] top-[450px] transform -translate-x-1/2 -translate-y-full z-20 flex flex-col items-center">
                    <div
                        class="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg mb-2 whitespace-nowrap border-2 border-primary">
                        Your Location
                    </div>
                    <div class="text-primary drop-shadow-md">
                        <span class="material-symbols-outlined text-4xl filled"
                            style="font-variation-settings: 'FILL' 1;">trip_origin</span>
                    </div>
                </div>

                <!-- Dropoff Marker -->
                <div
                    class="absolute left-[800px] top-[300px] transform -translate-x-1/2 -translate-y-full z-20 flex flex-col items-center">
                    <div
                        class="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg mb-2 whitespace-nowrap border-2 border-accent">
                        Central Station
                    </div>
                    <div class="text-accent drop-shadow-md">
                        <span class="material-symbols-outlined text-4xl filled"
                            style="font-variation-settings: 'FILL' 1;">location_on</span>
                    </div>
                </div>

                <!-- Nearby Taxi Icons -->
                <div aria-hidden="true"
                    class="absolute left-[400px] top-[200px] text-white/50 transform rotate-45 z-10">
                    <span class="material-symbols-outlined text-2xl">local_taxi</span>
                </div>
                <div aria-hidden="true"
                    class="absolute left-[600px] top-[500px] text-white/50 transform -rotate-12 z-10">
                    <span class="material-symbols-outlined text-2xl">local_taxi</span>
                </div>
            </div>

            <!-- Map Controls -->
            <div class="absolute bottom-8 right-8 flex flex-col gap-3 z-30">
                <button aria-label="Locate me"
                    class="size-12 bg-[#283039] hover:bg-[#3b4754] text-white rounded-xl shadow-lg flex items-center justify-center transition-colors border border-[#3b4754]">
                    <span class="material-symbols-outlined">my_location</span>
                </button>

                <button aria-label="Zoom in"
                    class="size-12 bg-[#283039] hover:bg-[#3b4754] text-white rounded-xl shadow-lg flex items-center justify-center transition-colors border border-[#3b4754]">
                    <span class="material-symbols-outlined">add</span>
                </button>

                <button aria-label="Zoom out"
                    class="size-12 bg-[#283039] hover:bg-[#3b4754] text-white rounded-xl shadow-lg flex items-center justify-center transition-colors border border-[#3b4754]">
                    <span class="material-symbols-outlined">remove</span>
                </button>
            </div>

            <!-- Map Legend (Accessibility) -->
            <div
                class="absolute top-6 right-6 bg-[#161b22]/90 backdrop-blur-sm p-4 rounded-xl border border-[#3b4754] shadow-lg z-30 text-white max-w-[200px]">
                <h3 class="text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">Map Legend</h3>
                <ul class="space-y-2 text-sm">
                    <li class="flex items-center gap-2">
                        <span class="w-6 h-1 bg-primary rounded-full"></span>
                        <span>Your Route</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="size-4 rounded-full border-2 border-primary bg-primary/20"></span>
                        <span>Pick-up</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="size-4 rounded-full bg-accent border-2 border-accent"></span>
                        <span>Drop-off</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="size-4 rounded bg-[#3b4754] map-pattern-hatch"></span>
                        <span>High Traffic</span>
                    </li>
                </ul>
            </div>
        </section>
    </main>
</body>

</html>