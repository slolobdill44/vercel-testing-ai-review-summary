"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Review as ReviewType } from "@/lib/types";
import ms from "ms";
import { useEffect, useState } from "react";
import { FiveStarRating } from "./five-star-rating";

export function Review({ review }: { review: ReviewType }) {
    const date = new Date(review.date);
    const [timeText, setTimeText] = useState<string>("");

    useEffect(() => {
        setTimeText(timeAgo(date));
    }, [date]);

    return (
        <div className="flex gap-4">
            <Avatar>
                <AvatarFallback>{getInitials(review.reviewer)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-sm">{review.reviewer}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <FiveStarRating rating={review.stars} />
                            <time className="tx-sx text-muted-foreground" suppressHydrationWarning>
                                {timeText}
                            </time>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function getInitials(name: string): string {
    return name.split(" ").map((word) => word[0]).join("").toUpperCase().slice(0,2);
}

function timeAgo(date: Date, suffix = true): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 1000) {
        return "Just now";
    }

    return `${ms(diff, { long: true})}${suffix ? " ago": ""}`;
}