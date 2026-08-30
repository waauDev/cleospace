import dayjs from "dayjs";
import Link from "next/link";

import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";

import { cn } from "@/lib/utils";
import { getFeedbackByInterviewId } from "@/lib/actions/general.actions";

const InterviewCard = async ({
  id,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && id
      ? await getFeedbackByInterviewId({
          id,
          userId,
        })
      : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeDot =
    {
      Behavioral: "bg-success",
      Mixed: "bg-secondary",
      Technical: "bg-warning",
    }[normalizedType] || "bg-warning";

  const reelColor =
    {
      Behavioral: "text-success",
      Mixed: "text-secondary",
      Technical: "text-warning",
    }[normalizedType] || "text-warning";

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="card-border w-75 max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          {/* Type label — printed like a cassette spine sticker */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 -rotate-2 bg-surface border-nb px-2.5 py-1 rounded-sm">
            <span className={cn("size-1.5 rounded-full", badgeDot)} />
            <p className="badge-text">{normalizedType}</p>
          </div>

          {/* Cover — a saved-reel porthole, colored by session type */}
          <div className="size-17 rounded-full overflow-hidden bg-text flex-center">
            <svg viewBox="0 0 40 40" className={cn("size-11", reelColor)} aria-hidden="true">
              <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="20" cy="20" r="4" fill="currentColor" />
              <circle cx="20" cy="9" r="2" fill="currentColor" />
              <circle cx="29.5" cy="25.5" r="2" fill="currentColor" />
              <circle cx="10.5" cy="25.5" r="2" fill="currentColor" />
            </svg>
          </div>

          {/* Interview Role */}
          <h3 className="mt-5 capitalize text-text!">{role} Interview</h3>

          {/* Date & Score — the LCD readout */}
          <div className="screen w-fit mt-3 flex flex-row gap-4">
            <span className="digits text-sm">{formattedDate}</span>
            <span className="digits digits--green text-sm">
              {feedback?.totalScore ?? "---"}/100
            </span>
          </div>

          {/* Feedback or Placeholder Text */}
          <p className="line-clamp-2 mt-5 text-text-dim!">
            {feedback?.finalAssessment ||
              "You haven't taken this interview yet. Take it now to improve your skills."}
          </p>
        </div>

        <div className="flex flex-row justify-between items-center">
          <DisplayTechIcons techStack={techstack} />

          <Button asChild className="btn-primary">
            <Link href={feedback ? `/space/${id}/feedback` : `/space/${id}`}>
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
