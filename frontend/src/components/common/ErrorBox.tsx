function ErrorBox({ message }: { message?: string | null }) {
  return (
    <p className="text-red-500 text-xs">
      {message}
    </p>
  )
}

export default ErrorBox