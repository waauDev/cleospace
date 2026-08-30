"use client"
import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "./FormField";
import Logo from "./Logo";



const authFormSchema = (type:FormType)=>{
    return z.object ({
        name: type==="sign-up" ? z.string().min(3):z.string().optional(),
        email:z.string().email(),
        password:z.string().min(5),
    })
};



const AuthForm = ({type}:{type:FormType}) => {
    const router = useRouter();
    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            email:"",
            password:"",
        },
    });

    const onSubmit = async(data:z.infer<typeof formSchema>)=>{
        try{
            if(type==="sign-up"){
                const{name, email, password} = data;
                
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                const result = await signUp({
                    uid:userCredential.user.uid,
                    name: name!,
                    email,
                    password,
                });

                if(!result?.success){
                    toast.error(result?.message);
                    return;
                }

                toast.success("Cuenta creada satisfactoriamente, por favor ingresa...");
                router.push("/sign-in")
            }else{

                const {email, password} = data;

                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password,
                );

                const idToken = await userCredential.user.getIdToken();
                if(!idToken){
                    toast.error("Fallo al ingresar, intente nuevamente");
                    return;
                }

                await signIn({
                    email,
                    idToken,
                });

                toast.success("Ingresando....")
                router.push("/");
            }
        }catch(error){
            console.log(error);
            toast.error(`el error que se presenta :${error}`);

        }

    }
    const isSignIn = type ==="sign-in";

  return (
    <div className="card-border lg:min-w-141.5">
        <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 items-center justify-center">
                <Logo className="size-8 text-text" />
                <h2 className="text-text!">CleoSpace</h2>
            </div>
            <h3 className="text-center text-text-dim! text-base! font-normal!">Desahogate con la IA</h3>
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-6 mt-4 form"
                >
                    {!isSignIn &&(
                        <FormField
                            control={form.control}
                            name="name"
                            label="Nombre"
                            placeholder="Tu nombre"
                            type="text"
                            />
                        
                    )}

                    <FormField
                        form={form.control}
                        name="email"
                        label="Email"
                        placeholder="Tu correo"
                        type="email"
                    />

                    <FormField
                        form={form.control}
                        name="password"
                        label="Contraseña"
                        placeholder="Ingresa tu contraseña"
                        type="password"
                    />

                    <Button className="btn" type="submit">
                        {isSignIn ? "Ingresar":"Crea tu cuenta"}
                    </Button>
                </form>
            </Form>
            <p className="text-center text-text-dim!">
                {isSignIn ? "No tienes cuenta aun?":"Ya estas registrado?"}
                <Link href={!isSignIn ?"/sign-in":"/sign-up"}
                    className="font-bold text-secondary ml-1"
                    >
                        {!isSignIn ?"sign-in":"sign-up"}
                </Link>
            </p>
        </div>

    </div>
  )
}

export default AuthForm