import Link from "next/link";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/general.actions";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = latestInterviews?.length! > 0;
  const savedCount = userInterviews?.length ?? 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg relative z-10">
          <h2 className="text-text!">Get Interview-Ready with AI-Powered Practice &amp; Feedback</h2>
          <p className="text-lg text-text!">
            Practice real interview questions &amp; get instant feedback
          </p>

          <Button asChild className="btn-secondary max-sm:w-full">
            <Link href="/space">Start an Interview</Link>
          </Button>
        </div>

        <div className="flex flex-col items-center gap-3 max-sm:hidden relative z-10">
          <div className="size-28 rounded-full bg-secondary border-nb nb-shadow flex-center rotate-3">
            <span className="digits text-text! text-2xl! font-black -rotate-3">
              {String(savedCount).padStart(2, "0")}
            </span>
          </div>
          <div className="screen w-fit">
            <span className="digits text-sm">MENSAJES GUARDADOS</span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>No tienes entrevistas realizadas</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>No hay nuevas entrevistas</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
