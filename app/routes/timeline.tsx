import { useEffect, useMemo, useState } from "react";
import { GlassButton } from "../components/buttons";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import type { Route } from "./+types/timeline";
import { ProtectedRoute } from "../components/ProtectedRoute";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Health Timeline • Echovia" },
		{ name: "description", content: "View your historical check-ins on a calendar." },
	];
}

function classifyDot(entry: { result: "clear" | "concern"; symptoms: Record<string, boolean> }) {
	if (entry.result === "concern") return "red" as const;
	const hadSymptom = Object.entries(entry.symptoms).some(([key, val]) => key !== "normal" && val);
	return hadSymptom ? ("yellow" as const) : ("green" as const);
}

type CheckinEntry = {
	completedAt: string;
	symptoms: Record<string, boolean>;
	notes?: string;
	result: "clear" | "concern";
};

type DotColor = "green" | "yellow" | "red";

export default function Timeline() {
	const now = new Date();
	const [year, setYear] = useState(now.getFullYear());
	const [month, setMonth] = useState(now.getMonth()); // 0-indexed
	const [history, setHistory] = useState<CheckinEntry[]>([]);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [daySize, setDaySize] = useState(44);

	useEffect(() => {
		try {
			const raw = localStorage.getItem("checkinHistory");
			setHistory(raw ? JSON.parse(raw) : []);
		} catch {
			setHistory([]);
		}
	}, []);

	useEffect(() => {
		const calc = () => {
			const w = window.innerWidth;
			if (w < 340) setDaySize(34);
			else if (w < 380) setDaySize(36);
			else if (w < 420) setDaySize(38);
			else setDaySize(44);
		};
		calc();
		window.addEventListener("resize", calc);
		return () => window.removeEventListener("resize", calc);
	}, []);

	const entriesByDay = useMemo(() => {
		const map = new Map<string, CheckinEntry[]>();
		for (const entry of history) {
			const d = new Date(entry.completedAt);
			const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
			if (!map.has(key)) map.set(key, []);
			map.get(key)!.push(entry);
		}
		return map;
	}, [history]);

	return (
		<ProtectedRoute>
			<main className="p-4 sm:p-6 mx-auto max-w-xl sm:max-w-4xl overflow-hidden">
			<header className="mb-4">
				<h1 className="text-black text-2xl font-semibold">Health Timeline</h1>
			</header>

			<section className="flex items-center justify-center" style={{ minHeight: "60vh" }}>
				<div className="glass-card calendar-card rdp-root">
					<div className="glass-filter" />
					<div className="glass-overlay" />
					<div className="glass-specular" />
					<div className="glass-content" style={{ padding: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
						<DayPicker navLayout="around"
							classNames={(function(){ const d = getDefaultClassNames(); return { ...d, root: d.root + " rdp-root" }; })()}
						style={{ ['--rdp-accent-color' as any]: 'var(--eco-green)', ['--rdp-day_button-width' as any]: `${daySize}px`, ['--rdp-day_button-height' as any]: `${daySize}px`, ['--rdp-day_button-border-radius' as any]: '8px', margin: '0 auto' }}
						numberOfMonths={1}
							month={new Date(year, month, 1)}
							onMonthChange={(d) => { setYear(d.getFullYear()); setMonth(d.getMonth()); }}
							showOutsideDays
							weekStartsOn={0}
							modifiers={(() => {
								const clearDays = new Set<string>();
								const yellowDays = new Set<string>();
								const redDays = new Set<string>();
								for (const [key, entries] of entriesByDay.entries()) {
									const colors = entries.map(classifyDot);
									if (colors.includes("red")) redDays.add(key);
									else if (colors.includes("yellow")) yellowDays.add(key);
									else clearDays.add(key);
								}
								const toDateArr = (set: Set<string>) => Array.from(set).map((k) => { const [y,m,day] = k.split("-").map(Number); return new Date(y,m,day); });
								return { clear: toDateArr(clearDays), yellow: toDateArr(yellowDays), red: toDateArr(redDays) };
							})()}
							modifiersClassNames={{ clear: "calendar-dot-clear", yellow: "calendar-dot-yellow", red: "calendar-dot-red" }}
							onDayClick={(d) => setSelectedDate(d)}
						/>
					</div>
				</div>
			</section>

			{selectedDate && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div className="absolute inset-0 bg-black/40" style={{ WebkitBackdropFilter: "blur(10px)", backdropFilter: "blur(10px)" }} onClick={() => setSelectedDate(null)} />
					<div className="relative z-10 w-full max-w-md px-5">
						<div className="glass-card" style={{ borderRadius: 20, boxShadow: "0 6px 24px rgba(0,0,0,0.2)" }}>
							<div className="glass-filter" style={{ WebkitBackdropFilter: "blur(14px)", backdropFilter: "blur(14px)" }} />
							<div className="glass-distortion-overlay" />
							<div className="glass-overlay" />
							<div className="glass-specular" />
							<div className="glass-content p-5">
								<h3 className="text-lg font-medium mb-2">
									{selectedDate.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
								</h3>
								{(() => {
									const key = `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`;
									const entries = entriesByDay.get(key) ?? [];
									if (!entries.length) return <p className="text-sm text-white/90">No entries for this day.</p>;
									return (
										<div className="space-y-3 max-h-80 overflow-auto">
											{entries.map((e, idx) => (
												<div key={idx} className="rounded-lg p-3 bg-white/5 text-white">
													<p className="text-sm mb-1">
														Result: {e.result === "clear" ? "All clear" : "Area of concern"}
													</p>
													<p className="text-xs text-white/70 mb-2">
														Time: {new Date(e.completedAt).toLocaleTimeString()}
													</p>
													<p className="text-xs">
														Symptoms: {Object.entries(e.symptoms)
															.filter(([, v]) => v)
															.map(([k]) => k)
															.join(", ") || "None"}
													</p>
													{e.notes && <p className="text-xs mt-1">Note: {e.notes}</p>}
												</div>
											))}
										</div>
								);
								})()}
								<div className="mt-4 flex justify-end">
									<GlassButton onClick={() => setSelectedDate(null)}>
										<span>Close</span>
									</GlassButton>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</main>
		</ProtectedRoute>
	);
}

