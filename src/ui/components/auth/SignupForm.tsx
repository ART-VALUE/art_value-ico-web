import React, { FunctionComponent, useState } from "react";
import { Label } from "../../style/form";

const SignupForm: FunctionComponent<{
  onFormComplete: (email: string) => void
}> = ({ onFormComplete }) => {
  const [email, setEmail] = useState<string>('')

  return (<form onSubmit={e => {
    e.preventDefault()
    onFormComplete(email)
  }}>
    <Label>
      Email
      <input
        type="text"
        placeholder="john.doe@example.com"
        onChange={e => setEmail(e.target.value)} />
    </Label>
    <button type="submit" value="portis">
      Sign up
    </button>
  </form>)
}

export default SignupForm
