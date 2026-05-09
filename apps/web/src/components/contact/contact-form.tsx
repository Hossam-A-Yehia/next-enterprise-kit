"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { submitContactAction } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactInput } from "@/lib/validations/contact";
import { useContactDemoStore } from "@/stores/demo-ui-store";

export function ContactForm() {
  const recordContactSuccess = useContactDemoStore((s) => s.recordContactSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
    mode: "onTouched",
  });

  async function onSubmit(data: ContactInput) {
    const result = await submitContactAction(data);
    if (result.ok) {
      reset();
      recordContactSuccess();
      toast.success("Message sent", {
        description: "This is a demo — wire email in a later phase.",
      });
      return;
    }
    toast.error("Could not send", { description: result.message });
  }

  return (
    <Card
      id="contact"
      className="scroll-mt-24 w-full max-w-lg"
      size="sm"
      role="region"
      aria-labelledby="contact-heading"
    >
      <CardHeader>
        <h2
          id="contact-heading"
          className="font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm"
        >
          Contact
        </h2>
        <CardDescription>
          React Hook Form + Zod on the client; the server action validates again with
          the same schema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-5"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="contact-name">Name</FieldLabel>
            <FieldContent>
              <Input
                id="contact-name"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                {...register("name")}
              />
              <FieldError id="contact-name-error" errors={[errors.name]} />
            </FieldContent>
          </Field>

          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="contact-email">Email</FieldLabel>
            <FieldContent>
              <Input
                id="contact-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                {...register("email")}
              />
              <FieldError id="contact-email-error" errors={[errors.email]} />
            </FieldContent>
          </Field>

          <Field data-invalid={!!errors.message}>
            <FieldLabel htmlFor="contact-message">Message</FieldLabel>
            <FieldContent>
              <Textarea
                id="contact-message"
                rows={5}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                {...register("message")}
              />
              <FieldError id="contact-message-error" errors={[errors.message]} />
            </FieldContent>
          </Field>

          <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
            {isSubmitting ? "Sending…" : "Send message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
