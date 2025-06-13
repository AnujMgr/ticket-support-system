import TicketForm from "@/components/forms/TicketForm";
import { Fragment } from "react/jsx-runtime";


export default function CreateTicketPage() {
  return (
    <Fragment>
      <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight text-balance">
        Create Ticket
      </h1>

      <TicketForm />
    </Fragment>
  )
}