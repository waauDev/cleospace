import Agent from "@/components/Agent";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewById } from "@/lib/actions/general.actions";
import { cn } from "@/lib/utils";
import {redirect} from "next/navigation";



const Page = async ({params}:RouteParams)=>{

  const user = await getCurrentUser();
  const {id} = await params;
  const interview = await getInterviewById(id);
  if(!interview) redirect('/');

  const reelColor =
    {
      Behavioral: "text-success",
      Mixed: "text-secondary",
      Technical: "text-warning",
    }[interview.type] || "text-warning";


  return(
    <>
    <div className="nameplate flex-row gap-4 justify-between flex-wrap">
      <div className="flex flex-row gap-4 items-center max-sm:flex-col">
        <div className="flex flex-row gap-4 items-center">
          <div className="size-11 rounded-full overflow-hidden bg-text flex-center">
            <svg viewBox="0 0 40 40" className={cn("size-8", reelColor)} aria-hidden="true">
              <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="20" cy="20" r="4" fill="currentColor" />
              <circle cx="20" cy="9" r="2" fill="currentColor" />
              <circle cx="29.5" cy="25.5" r="2" fill="currentColor" />
              <circle cx="10.5" cy="25.5" r="2" fill="currentColor" />
            </svg>
          </div>
          <h3 className="capitalize text-text!">{interview.role}</h3>
        </div>
      <DisplayTechIcons techStack={interview.techstack}/>
      </div>
      <p className="screen digits text-xs h-fit capitalize">{interview.type}</p>

    </div>
    <Agent
      userName={user?.name}
      type={user?.id}
      interviewId={id}
      type='interview'
      questions={interview.questions}
    />
    </>
  )
}
export default Page