import { z } from "zod"
import { toast } from "sonner"
import type { ChangeEvent } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ticketFormSchema } from "@/schema/ticket-form.schama"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCreateTicketMutation } from "@/redux/features/tickets/ticketsApiSlice"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

function TicketForm() {
  const [createTicket, { isLoading }] = useCreateTicketMutation();
  const form = useForm<z.infer<typeof ticketFormSchema>>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: { subject: "", description: "", attachment: undefined, status: "open" },
  })

  function onSubmit(values: z.infer<typeof ticketFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      createTicket(values);
      toast.success("Ticket has been created", {
        description: "Your ticket has been created successfully.",
      });
    } catch (err) {
      console.log(err)
    }
  }

  function showToast() {
    toast.success("Ticket has been created", {
      description: "Your ticket has been created successfully.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField control={form.control} name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Type your subject here." {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.subject?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField control={form.control} name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your message here." {...field} />
              </FormControl>

              <FormMessage>
                {form.formState.errors.description?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField control={form.control} name="attachment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attachment</FormLabel>
              <FormControl>
                <Input type="file" accept="image/png, image/jpeg, image/jpg" name={field.name} ref={field.ref} onBlur={field.onBlur}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0]; field.onChange(file || null); // Safer fallback
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField control={form.control} name="status" defaultValue="open"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col">
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="open" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Open
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="in_progress" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      In Progress
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="closed" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Closed
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>

      <Button onClick={showToast}>Show Toast</Button>
    </Form>
  )
}

export default TicketForm