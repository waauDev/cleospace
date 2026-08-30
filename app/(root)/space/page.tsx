import Agent from '@/components/Agent';
import { getCurrentUser } from '@/lib/actions/auth.action';

const Page = async()=> {
  const user = await getCurrentUser();
  return (
    <>
        <div className="nameplate w-fit">
          <h3 className="text-text!">Desahogate...</h3>
        </div>
        <Agent userName={user?.name} userId={user?.id} type="generate"/>
    </>
  )
}

export default Page