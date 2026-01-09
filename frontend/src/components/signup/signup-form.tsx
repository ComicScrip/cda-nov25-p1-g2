import {useState} from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useSignupMutation } from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import Link from "next/link";


export function SignupForm({ ...props } : React.ComponentProps<typeof Card>) {

  const router = useRouter();
  const [signup, {loading: isSubmitting, error}] = useSignupMutation();
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [age_range, setAgeRange] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const result = await signup({
        variables: {
          data: {
            email,
            pseudo,
            password,
            age_range
          },
        },
      });
      alert("Inscription réussie !");
      router.push("/");
      } catch(err) {
        console.error(err);
      }
  }

  return (
      <Card {...props} >
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FieldDescription className="text-xs">
                  Nous utiliserons cet email pour vous contacter, nous ne le partagerons pas.
                </FieldDescription>
              </Field>
              
              <Field>
                <FieldLabel htmlFor="pseudo">Pseudo</FieldLabel>
                <Input id="pseudo" type="text" placeholder="Tom Cruise" required onChange={(e) => setPseudo(e.target.value)}/>
                <FieldDescription className="text-xs">
                  Votre pseudo aparaîtra à l'écran.
                </FieldDescription>
              </Field>

              <Field>
              <FieldLabel>Tranche d'âge</FieldLabel>

                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Choisir votre tranche d'âge" />
                  </SelectTrigger>
                  <SelectContent className="text-white bg-gray-700">
                    <SelectItem value="light">Tout public</SelectItem>
                    <SelectItem value="dark">+12</SelectItem>
                    <SelectItem value="system">+16</SelectItem>
                  </SelectContent>
                </Select>
              </Field>


              <Field>
                <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)}/>
                <FieldDescription className="text-xs">
                  Le mot de passe doit contenir un minimum de 8 caractères, dont une minuscule, une majuscule, un chiffre et un caractère spécial.
                </FieldDescription>
              </Field>
              <FieldGroup>
                <Field>
                  <Button type="submit" variant="outline" className="cursor-pointer mb-4">Créer compte</Button>
                  <FieldDescription className="px-6 text-center">
                    Avez-vous déjà un compte ? <Link href="/login">Connexion</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
  )
}
