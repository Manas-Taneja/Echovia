import { useState } from "react";
import type { Route } from "./+types/new-user";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Welcome • Echovia" },
		{ name: "description", content: "Welcome to Echovia" },
	];
}

// Background SVG with texture
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

// Chevron arrow component
function ChevronArrow({ opacity = 1 }: { opacity?: number }) {
	return (
		<svg 
			width="28" 
			height="28" 
			viewBox="0 0 16 16" 
			fill="none" 
			xmlns="http://www.w3.org/2000/svg"
			style={{ opacity }}
		>
			<path 
				d="M4 10L8 6L12 10" 
			stroke="#000" 
				strokeWidth="2" 
				strokeLinecap="round" 
				strokeLinejoin="round"
			/>
		</svg>
	);
}

// Gradient control component with swipe functionality
function GradientControl() {
	const [pressed, setPressed] = useState(false);
	const [swipeProgress, setSwipeProgress] = useState(0);
	const [startY, setStartY] = useState(0);
	const [buttonPosition, setButtonPosition] = useState(0);
	
	const handleGoClick = () => {
		// Navigate to login page
		window.location.href = "/login";
	};

	// Use Pointer Events for consistent behavior in PWA/standalone and mobile browsers
	const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		setStartY(e.clientY);
		setPressed(true);
		// Ensure we keep receiving move events even if the pointer leaves the element
		try { (e.currentTarget as Element).setPointerCapture?.(e.pointerId); } catch {}
	};

	const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!pressed) return;
		const currentY = e.clientY;
		const deltaY = startY - currentY; // Positive when swiping up
		const maxDistance = 100; // Distance to middle chevron
		const constrainedDeltaY = Math.max(0, Math.min(maxDistance, deltaY));
		const progress = constrainedDeltaY / maxDistance;
		setSwipeProgress(progress);
		setButtonPosition(constrainedDeltaY);
	};

	const endInteraction = (e?: React.PointerEvent<HTMLDivElement>) => {
		if (swipeProgress > 0.8) {
			handleGoClick();
		}
		setPressed(false);
		setSwipeProgress(0);
		setButtonPosition(0);
		setStartY(0);
		if (e) {
			try { (e.currentTarget as Element).releasePointerCapture?.(e.pointerId); } catch {}
		}
	};

	const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => endInteraction(e);
	const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => endInteraction(e);
	
	return (
		<div style={{ 
			position: "relative",
			width: 135,
			height: 261,
			borderRadius: 66,
			background: "rgba(50, 75, 2, 0.5)",
			boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "space-between",
			padding: "20px 0",
			overflow: "hidden"
		}}>
			{/* Top section with chevron arrows */}
			<div style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 0,
				marginTop: 20,
				position: "relative",
				zIndex: 0
			}}>
				<ChevronArrow opacity={1} />
				<ChevronArrow opacity={1} />
				<ChevronArrow opacity={1} />
			</div>
			
			{/* Swipe area */}
			<div 
				style={{
					position: "relative",
					width: 106,
					height: 109,
					minWidth: 106,
					minHeight: 109,
					boxSizing: "border-box",
					flexShrink: 0,
					flexGrow: 0,
					flexBasis: "auto",
					borderRadius: 66,
					background: "#324B02",
					opacity: 1,
					boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					cursor: "pointer",
					transition: pressed ? "none" : "all 0.3s ease",
					transform: pressed ? `translateY(${-buttonPosition}px)` : "translateY(0px)",
					overflow: "hidden",
					marginBottom: 20,
					zIndex: 2,
					// Prevent the browser from treating vertical swipes as scroll gestures
					touchAction: "none",
					userSelect: "none"
				}}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerUp}
				onPointerCancel={handlePointerCancel}
				onContextMenu={(e) => e.preventDefault()}
			>
				<span style={{
					color: "#fff",
					fontSize: 18,
					fontWeight: 600,
					letterSpacing: 1,
					position: "relative",
					zIndex: 1
				}}>
					{swipeProgress > 1 ? "GO!" : "GO"}
				</span>
			</div>
		</div>
	);
}

// Echovia image component
function EchoviaImage() {
	return (
		<div style={{
			width: 259,
			height: 259,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			position: "relative"
		}}>
			<img 
				src="/Echovia.png" 
				alt="Echovia" 
				style={{
					width: "100%",
					height: "100%",
					objectFit: "contain"
				}}
			/>
		</div>
	);
}

export default function NewUserPage() {
	return (
		<div style={{ 
			width: "100vw", 
			height: "100vh", 
			position: "fixed",
			top: 0,
			left: 0,
			background: "#E8DCCA",
			display: "flex", 
			flexDirection: "column", 
			alignItems: "center",
			justifyContent: "space-between",
			padding: "60px 0 80px 0"
		}}>
			{/* Top section - Echovia Image */}
			<div style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 20
			}}>
				<EchoviaImage />
			</div>
			
			{/* Bottom section - Gradient Control */}
			<div style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 20
			}}>
				<GradientControl />
			</div>
		</div>
	);
}
