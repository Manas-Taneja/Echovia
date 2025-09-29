import { NavLink } from "react-router";

export function GlassNav() {
    return (
        <nav className="glass-nav mx-auto w-full">
            <div className="glass-card" style={{ display: "inline-block" }}>
                <div className="glass-filter" />
                <div className="glass-overlay" />
                <div className="glass-specular" />
                <div className="glass-content" style={{ padding: 8 }}>
                    <div className="glass-icons-grid">
                        {/* Home */}
                        <NavLink to="/home" className={({ isActive }) => `glass-icon${isActive ? " active" : ""}`}>
                            <div className="glass-filter" />
                            <div className="glass-overlay" />
                            <div className="glass-specular" />
                            <div className="glass-content">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" id="Avocado">
                                    <path fill="#565656" d="M25.5799 20.33C25.7399 18.44 25.2499 16.61 26.5899 15.27L27.4199 14.44C29.7799 12.08 29.7799 8.24002 27.4199 5.88002L25.5599 4.02002L24.2199 5.36002C22.7299 5.40002 21.2499 5.99002 20.1099 7.13002L19.8999 7.33002C18.5599 8.67002 16.7899 9.49002 14.9099 9.65002C12.4099 9.86002 10.0699 10.95 8.28994 12.73C5.31994 15.7 4.50994 20.01 5.86994 23.71L5.18994 24.39L7.73994 26.94C11.8199 31.02 18.4299 31.02 22.5099 26.94C24.2799 25.17 25.3699 22.83 25.5799 20.33Z" className="color44911b svgShape"></path>
                                    <path fill="#424242" d="M20.66 2C18.82 2 17.08 2.72 15.78 4.02L15.6 4.21C14.65 5.16 13.38 5.75 12.03 5.87C9.44 6.09 7.01 7.22 5.18 9.05C3.13 11.1 2 13.83 2 16.72C2 19.62 3.13 22.34 5.18 24.39C7.23 26.44 9.95 27.57 12.85 27.57C15.75 27.57 18.47 26.44 20.52 24.39C22.35 22.56 23.49 20.12 23.71 17.54C23.82 16.19 24.41 14.93 25.37 13.97L25.56 13.78C26.86 12.48 27.58 10.74 27.58 8.9C27.58 7.06 26.86 5.32 25.56 4.02C24.24 2.72 22.51 2 20.66 2Z" className="color008463 svgShape"></path>
                                    <path fill="#ffffff" d="M24.3201 12.93L24.5101 12.74C26.6301 10.62 26.6301 7.17997 24.5101 5.05997C22.3901 2.93997 18.9501 2.93997 16.8301 5.05997L16.6401 5.24997C15.4401 6.44997 13.8501 7.18997 12.1601 7.32997C9.9101 7.51997 7.8101 8.49997 6.2201 10.09C2.5601 13.75 2.5601 19.68 6.2201 23.34C9.8801 27 15.8101 27 19.4701 23.34C21.0601 21.75 22.0401 19.65 22.2301 17.4C22.3801 15.72 23.1201 14.13 24.3201 12.93Z" className="colorc3ef3c svgShape"></path>
                                    <path fill="#505050" d="M13.2899 20.69C15.6979 20.69 17.6499 18.7379 17.6499 16.33C17.6499 13.922 15.6979 11.97 13.2899 11.97C10.882 11.97 8.92993 13.922 8.92993 16.33C8.92993 18.7379 10.882 20.69 13.2899 20.69Z" className="color6d4534 svgShape"></path>
                                </svg>

                            </div>
                        </NavLink>
                        {/* About the App */}
                        <NavLink to="/about-the-app" className={({ isActive }) => `glass-icon${isActive ? " active" : ""}`}>
                            <div className="glass-filter" />
                            <div className="glass-overlay" />
                            <div className="glass-specular" />
                            <div className="glass-content ">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="Faq">
                                    <path d="M58.66 21.85H37.21v-6.44c0-2.94-2.39-5.34-5.34-5.34l-26.53-.01C2.4 10.05 0 12.45 0 15.39v16.99c0 2.94 2.39 5.34 5.34 5.34h.99v3c0 .53.29 1.01.76 1.26a1.442 1.442 0 0 0 1.48-.07l6.27-4.19H26.8v6.45c0 2.94 2.39 5.33 5.33 5.33h17.04l6.27 4.2a1.442 1.442 0 0 0 1.48.07c.47-.25.76-.73.76-1.26v-3h.99c2.95 0 5.34-2.39 5.35-5.33V27.2c-.02-2.95-2.42-5.35-5.36-5.35zm-30.39 13H14.39c-.28 0-.56.08-.8.24l-4.4 2.94v-1.75c0-.79-.64-1.43-1.43-1.43H5.34c-1.36 0-2.47-1.11-2.47-2.47V15.39c0-1.36 1.11-2.47 2.47-2.47l26.53.01c1.36 0 2.47 1.11 2.47 2.47v16.98c0 1.36-1.11 2.47-2.47 2.47h-3.6zm32.86 9.33c0 1.36-1.11 2.47-2.48 2.47h-2.42c-.79 0-1.43.64-1.43 1.43v1.75l-4.4-2.95c-.24-.16-.51-.24-.8-.24H32.12c-1.36 0-2.47-1.11-2.47-2.47v-6.45h2.21c2.94 0 5.34-2.39 5.34-5.34V24.7h21.45a2.48 2.48 0 0 1 2.48 2.48v17z" fill="#ffffff" className="color000000 svgShape"></path>
                                    <path d="M23.36 27.96a.574.574 0 0 0-.22-.12c-.09-.03-.22-.08-.38-.15-.16-.07-.35-.17-.59-.31-.23-.14-.5-.34-.8-.6.2-.2.38-.43.53-.69.16-.26.29-.55.39-.87.11-.32.19-.66.24-1.03.06-.37.08-.77.08-1.19 0-.82-.1-1.52-.29-2.12-.19-.6-.47-1.09-.85-1.48-.37-.39-.83-.68-1.37-.87-.54-.19-1.17-.28-1.87-.28-.75 0-1.41.11-1.97.34-.57.23-1.04.56-1.43.98-.38.43-.67.94-.87 1.55-.19.61-.29 1.3-.29 2.06 0 .84.09 1.57.27 2.18.18.61.46 1.11.82 1.51.36.39.82.68 1.37.87.55.19 1.19.28 1.92.28.39 0 .74-.04 1.06-.11.32-.08.59-.16.81-.27.27.31.56.58.87.81.31.24.62.44.92.6.3.16.58.29.84.38.26.09.47.13.63.13.04 0 .08-.01.11-.03.03-.02.07-.05.09-.11a.96.96 0 0 0 .07-.25c.02-.11.03-.25.03-.42 0-.22-.01-.39-.04-.51s-.02-.23-.08-.28zm-2.87-3.57c-.08.4-.22.76-.41 1.06-.19.3-.45.54-.77.71-.32.18-.71.26-1.18.26s-.86-.08-1.17-.23c-.31-.15-.56-.38-.74-.67a2.89 2.89 0 0 1-.39-1.06 7.38 7.38 0 0 1-.12-1.4c0-.44.04-.85.12-1.25.08-.4.22-.74.41-1.04.19-.3.45-.53.77-.71.32-.18.71-.26 1.18-.26s.86.08 1.17.24c.31.16.56.38.75.67.19.29.32.64.4 1.04.08.4.12.85.12 1.34-.01.46-.06.89-.14 1.3zm26.29 6.59a.704.704 0 0 0-.11-.23c-.04-.06-.12-.1-.22-.13a1.5 1.5 0 0 0-.42-.05c-.18-.01-.42-.01-.73-.01-.26 0-.47 0-.63.01-.16.01-.28.03-.37.05-.09.03-.16.07-.2.12-.04.05-.08.12-.11.21l-3.08 8.86c-.06.18-.1.32-.12.43-.02.11 0 .19.05.25s.14.1.28.11c.13.02.32.02.56.02.22 0 .4-.01.54-.02s.24-.03.32-.06c.07-.03.13-.07.16-.12a.75.75 0 0 0 .08-.18l.63-1.95h3.75l.67 2.01c.02.07.05.12.08.16s.08.07.16.1c.08.02.19.04.34.05.15.01.35.01.61.01.25 0 .45-.01.59-.02.14-.01.24-.05.3-.1s.08-.13.06-.24a2.5 2.5 0 0 0-.12-.44l-3.07-8.84zm-2.91 5.77 1.41-4.24h.01l1.41 4.24h-2.83z" fill="#ffffff" className="color000000 svgShape"></path>
                                </svg>
                            </div>
                        </NavLink>
                        {/* Knowledge */}
                        <NavLink to="/knowledge" className={({ isActive }) => `glass-icon${isActive ? " active" : ""}`}>
                            <div className="glass-filter" />
                            <div className="glass-overlay" />
                            <div className="glass-specular" />
                            <div className="glass-content">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="ThinkPower">
                                    <path d="M57,62a1,1,0,0,0,1-1V47a3,3,0,0,0-.56-1.73A9.25,9.25,0,0,0,62,37a10,10,0,0,0-2.28-6.46A4.6,4.6,0,0,0,60,29c0-3.93-5.27-7-12-7s-12,3.07-12,7a5.2,5.2,0,0,0,2,3.92V37a9,9,0,0,0,4.68,7.89A11,11,0,0,0,36,55v1H35a3,3,0,0,0,0,6m1-2H35a1,1,0,0,1,0-2h1Zm12-4H38V55a9,9,0,0,1,9-9h1Zm8,4H54V46h1a1,1,0,0,1,1,1ZM55,38a1,1,0,0,0-1,1v5H47a7,7,0,0,1-7-7V32a2,2,0,0,1,2-2H54v5a1,1,0,0,0,1,1,1,1,0,0,1,0,2Z" fill="#ffffff" className="color000000 svgShape"></path>
                                    <rect width="2" height="4" x="16" y="2" fill="#ffffff" className="color000000 svgShape"></rect>
                                    <rect width="2" height="4" x="16" y="28" fill="#ffffff" className="color000000 svgShape"></rect>
                                    <rect width="4" height="2" x="28" y="16" fill="#ffffff" className="color000000 svgShape"></rect>
                                    <rect width="4" height="2" x="2" y="16" fill="#ffffff" className="color000000 svgShape"></rect>
                                    <rect width="4" height="2" x="24.19" y="6.81" transform="rotate(-45 26.195 7.81)" fill="#ffffff" className="color000000 svgShape"></rect>
                                    <rect width="4" height="2" x="5.81" y="25.19" transform="rotate(-45 7.807 26.186)" fill="#ffffff" className="color000000 svgShape"></rect>
                                    <rect width="2" height="4" x="25.19" y="24.19" transform="rotate(-45 26.19 26.192)" fill="#ffffff" className="color000000 svgShape"></rect>
                                    <rect width="2" height="4" x="6.81" y="5.81" transform="rotate(-45 7.813 7.804)" fill="#ffffff" className="color000000 svgShape"></rect>
                                    <rect width="2" height="4" x="16" y="34" fill="#ffffff" className="color000000 svgShape"></rect>
                                    <rect width="2" height="4" x="16" y="40" fill="#ffffff" className="color000000 svgShape"></rect>
                                    <rect width="2" height="4" x="16" y="46" fill="#ffffff" className="color000000 svgShape"></rect>
                                    <rect width="4" height="2" x="20" y="48" fill="#ffffff" className="color000000 svgShape"></rect>
                                    <rect width="4" height="2" x="26" y="48" fill="#ffffff" className="color000000 svgShape"></rect>
                                    <rect width="4" height="2" x="32" y="48" fill="#ffffff" className="color000000 svgShape"></rect>
                                    <path d="M17,26a9,9,0,1,0-9-9A9,9,0,0,0,17,26Zm0-15a6,6,0,0,1,6,6H21a4,4,0,0,0-4-4Z" fill="#ffffff" className="color000000 svgShape"></path>
                                </svg>
                            </div>
                        </NavLink>
                        {/* Settings */}
                        <NavLink to="/settings" className={({ isActive }) => `glass-icon${isActive ? " active" : ""}`}>
                            <div className="glass-filter" />
                            <div className="glass-overlay" />
                            <div className="glass-specular" />
                            <div className="glass-content">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="settings">
                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" fill="#ffffff" className="color000000 svgShape"></path>
                                </svg>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}

