import { useMemo, useState } from "react";
import type { Route } from "./+types/login";
import { useAuth } from "../contexts/AuthContext";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Enter Passcode • Echovia" },
		{ name: "description", content: "Secure PIN entry" },
	];
}

const BG_SVG = (
	<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" fill="none" aria-hidden style={{ position: "absolute", inset: 0 }}>
		<rect width="100%" height="100%" fill="#E8DCCA"/>
		<defs>
			<filter id="grain-filter" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
				<feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" seed="572"/>
				<feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise"/>
				<feComponentTransfer in="alphaNoise" result="coloredNoise">
					<feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"/>
				</feComponentTransfer>
				<feFlood floodColor="rgba(0, 0, 0, 0.03)" result="grainColor"/>
				<feComposite operator="in" in2="coloredNoise" in="grainColor" result="grain"/>
			</filter>
		</defs>
		<rect width="100%" height="100%" fill="url(#grain-filter)" opacity="0.4"/>
	</svg>
);

function Dot({ active }: { active: boolean }) {
	return (
		<span
			style={{
				display: "inline-block",
				width: 12,
				height: 12,
				borderRadius: 9999,
				border: `2px solid #324B02`,
				background: active ? "#324B02" : "transparent",
				marginInline: 6,
			}}
			aria-hidden
		/>
	);
}

function Key({ label, onPress }: { label: string; onPress: (v: string) => void }) {
	const [pressed, setPressed] = useState(false);
	return (
		<button
			onClick={() => onPress(label)}
			onPointerDown={() => setPressed(true)}
			onPointerUp={() => setPressed(false)}
			onPointerLeave={() => setPressed(false)}
			className="focus:outline-none"
			style={{
				width: 74,
				height: 74,
				borderRadius: 9999,
				border: "2px solid #324B02",
				background: pressed ? "#324B02" : "rgba(0,0,0,0.1)",
				color: pressed ? "#fff" : "#000",
				fontSize: 22,
				fontWeight: 600,
				transition: "background-color 180ms ease, color 180ms ease, transform 80ms ease",
			}}
		>
			{label}
		</button>
	);
}

function Pressable({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
	const [pressed, setPressed] = useState(false);
	return (
		<button
			onClick={onClick}
			onPointerDown={() => setPressed(true)}
			onPointerUp={() => setPressed(false)}
			onPointerLeave={() => setPressed(false)}
			className="focus:outline-none"
			style={{
				width: 74,
				height: 74,
				borderRadius: 9999,
				border: "2px solid #324B02",
				background: pressed ? "#324B02" : "rgba(0,0,0,0.1)",
				color: pressed ? "#fff" : "#000",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				transition: "background-color 180ms ease, color 180ms ease, transform 80ms ease",
			}}
		>
			{children}
		</button>
	);
}

export default function LoginPin() {
	const [pin, setPin] = useState<string>("");
	const [error, setError] = useState<string>("");
	const { login } = useAuth();
	const max = 4;
	const keys = useMemo(() => ["1","2","3","4","5","6","7","8","9","0"], []);
	
	// Default PIN for demo purposes - in real app this would be stored securely
	const correctPin = "1234";

	function onPress(v: string) {
		if (pin.length >= max) return;
		setError(""); // Clear any previous error
		const newPin = (pin + v).slice(0, max);
		setPin(newPin);
		
		// Check if PIN is complete and validate
		if (newPin.length === max) {
			setTimeout(() => {
				if (newPin === correctPin) {
					// Successful login - set auth state and redirect to home
					login();
					window.location.href = "/home";
				} else {
					// Incorrect PIN
					setError("Incorrect password");
					setPin(""); // Clear PIN for retry
				}
			}, 300); // Small delay for better UX
		}
	}
	function clearOne() { 
		setError(""); // Clear error when user starts typing
		setPin((p) => p.slice(0, -1)); 
	}
	function clearAll() { 
		setError(""); // Clear error when clearing
		setPin(""); 
	}

	return (
		<main style={{ 
			position: "fixed", 
			top: 0, 
			left: 0, 
			width: "100vw", 
			height: "100vh", 
			background: "#E8DCCA",
			display: "flex", 
			flexDirection: "column", 
			alignItems: "center",
			justifyContent: "center",
			overflow: "hidden"
		}}>
			<div style={{ position: "absolute", inset: 0, zIndex: 0 }}>{BG_SVG}</div>
			<div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
				<h1 style={{ marginBottom: 10, fontSize: 22, fontWeight: 600, color: "#000" }}>Enter Passcode</h1>
				<div aria-label="PIN progress" style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
					{Array.from({ length: max }).map((_, i) => (
						<Dot key={i} active={i < pin.length} />
					))}
				</div>
				
				{error && (
					<div style={{ 
						color: "#ef4444", 
						fontSize: 16, 
						fontWeight: 500, 
						marginBottom: 34,
						textAlign: "center",
						minHeight: 20
					}}>
						{error}
					</div>
				)}

				<button
					onClick={() => {
						// TODO: Implement forgot password functionality
						console.log("Forgot password clicked");
					}}
					className="focus:outline-none mb-6"
					style={{
						color: "#324B02",
						fontSize: 16,
						fontWeight: 500,
						background: "transparent",
						border: "none",
						textDecoration: "underline",
						cursor: "pointer",
					}}
				>
					Forgot password?
				</button>

				<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 34, width: 315, justifyItems: "center" }}>
					{keys.slice(0, 9).map((k) => (
						<Key key={k} label={k} onPress={onPress} />
					))}
					<div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center", alignItems: "center", gap: 34, marginTop: 18 }}>
					<Pressable onClick={clearAll}>Clear</Pressable>
						<Key label="0" onPress={onPress} />
					<Pressable onClick={clearOne}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24" fill="currentColor">
							<rect width="256" height="256" fill="none"></rect>
							<path d="M215.99512,39.99805H68.52637a16.1162,16.1162,0,0,0-13.71875,7.76562L9.13574,123.88086a8.02459,8.02459,0,0,0,0,8.23437l45.67188,76.11719v.00781a16.10652,16.10652,0,0,0,13.71875,7.75782H215.99512a16.01583,16.01583,0,0,0,16-16v-144A16.01582,16.01582,0,0,0,215.99512,39.99805ZM165.65137,146.3418a7.99915,7.99915,0,1,1-11.3125,11.3125l-18.34375-18.34375L117.65137,157.6543a7.99915,7.99915,0,0,1-11.3125-11.3125l18.34375-18.34375L106.33887,109.6543a7.99915,7.99915,0,0,1,11.3125-11.3125l18.34375,18.34375L154.33887,98.3418a7.99915,7.99915,0,0,1,11.3125,11.3125l-18.34375,18.34375Z"></path>
						</svg>
					</Pressable>
					</div>
				</div>

			</div>
		</main>
	);
}




