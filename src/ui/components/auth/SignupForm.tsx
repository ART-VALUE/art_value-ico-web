import React, { FunctionComponent, useState } from "react";
import { Button } from "../../style/button";
import { Input, Label } from "../../style/form";

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
      <Input
        type="text"
        placeholder="john.doe@example.com"
        onChange={e => setEmail(e.target.value)} />
    </Label>
    <Button type="submit" value="portis">
      Sign up
    </Button>
  </form>)
}

export default SignupForm
