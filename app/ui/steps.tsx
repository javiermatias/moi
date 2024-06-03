'use client'

import { useState } from "react";
import { Steps } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

export default function Step({ id }: { id: number }) {
    const [step] = useState(id);

    // Define your step data (titles and descriptions)
    const stepsData = [
        { title: 'Datos Generales', description: 'Datos Generales' },
        { title: 'Datos del Despacho', description: 'Despacho' },
        { title: 'Participantes', description: 'Participantes' },
        { title: 'Entrevista Indicadores', description: 'Entrevista Indicadores' },
    ];
    // Calculate the range of steps to display based on the current step
    const startStep = Math.max(0, step - 1);
    const endStep = Math.min(stepsData.length - 1, step + 1);
    return (
        <div>
            <Steps current={step}>
                {stepsData.slice(startStep, endStep + 1).map((step, index) => (
                    <Steps.Item key={index} title={step.title} description={step.description} />
                ))}
            </Steps>

        </div>

    )
}