'use client'

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import 'rsuite/dist/rsuite.min.css';
import { Steps, Panel, Placeholder, ButtonGroup, Button } from 'rsuite';

export default function Page() {

  const [step, setStep] = useState(0);
  const onChange = (nextStep: number) => {
    setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  };

  const onNext = () => onChange(step + 1);
  const onPrevious = () => onChange(step - 1);


  return (
    <div>
      <Steps current={step}>
        <Steps.Item title="Datos Generales" description="Description" />
        <Steps.Item title="In Progress" description="Description" />
        <Steps.Item title="Waiting" description="Description" />
        <Steps.Item title="Waiting" description="Description" />
      </Steps>
      <hr />
      <Panel header={`Step: ${step + 1}`}>
        <Placeholder.Paragraph />
      </Panel>
      <hr />
      <ButtonGroup>
        <Button onClick={onPrevious} disabled={step === 0}>
          Atras
        </Button>
        <Button onClick={onNext} disabled={step === 3}>
          Siguiente
        </Button>
      </ButtonGroup>
    </div>
  );
}