import { NextResponse } from "next/server";

function logError(error: unknown) {
    console.error("[Contact API Error]:", error);
}

export async function POST(req: Request) {
    try {
        const url = new URL(req.url);
        const forceError = url.searchParams.get("forceError");

        // Showcase forced error
        if (forceError === "true") {
            console.error("Forced error triggered (showcase)");
            return NextResponse.json(
                { success: false, error: "Forced error (demo)" },
                { status: 400 }
            );
        }

        const body = await req.json();
        const { firstName, email, contactNumber, companyWebsite, message } =
            body;

        if (!firstName || !email || !contactNumber) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Simulated success
        return NextResponse.json(
            { success: true, message: "Form submitted successfully!" },
            { status: 200 }
        );
    } catch (error) {
        logError(error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
