"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export default function ConsentAlert(): JSX.Element {
    const router = useRouter();

    const handleContinue = () => {
        router.push("/bodyscan");
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className="px-6 py-3 text-lg font-semibold border-2 border-gray-800 rounded-md hover:bg-gray-100">Begin</AlertDialogTrigger>
            <AlertDialogContent className="max-h-[80vh] overflow-y-auto">
                <AlertDialogHeader>
                    <AlertDialogTitle>Do you agree to these terms</AlertDialogTitle>
                    <AlertDialogDescription>
                        <strong>Informed Consent</strong>
                        <br />
                        <br />
                        You are invited to participate in a research study. Before you agree, however, you must be fully informed about the purpose of the study, the procedures to be followed, and any benefits, risks, or discomfort that you may experience as a result of your participation. This form presents information about the study so that you may make a fully informed decision regarding your participation.
                        <br />
                        <br />
                        <strong>Purpose of the study:</strong>
                        <br />
                        The purpose of this study is to improve an existing art-based mental wellness class curriculum by investigating the relationship between the arts and mental health, individual and cultural perceptions of mental illness, and how these experiences can be improved upon.
                        <br />
                        <br />
                        You will be asked to fill a questionnaire in order to help us understand your perspective on this topic.
                        <br />
                        <br />
                        <strong>Procedures to be followed:</strong>
                        <br />
                        If you choose to participate, you will take part in a 5-10 minute survey where you will be asked questions about topics such as:
                        <br />
                        <span>- Art and creativity</span>
                        <br />
                        <span>- Mental health and well-being</span>
                        <br />
                        <span>- Technology</span>
                        <br />
                        <span>- Culture</span>
                        <br />
                        <span>- Your personal experiences related to these areas.</span>
                        <br />
                        <br />
                        Your participation is entirely voluntary. If at any point you feel uncomfortable, you may choose to skip a question or quit the survey. Due to confidentiality limitations, however, we are unable to withdraw your answers once your survey answers are submitted.
                        <br />
                        <br />
                        <strong>Risks to study participants:</strong>
                        <br />
                        This study involves discussions about mental wellness and personal mental health experiences, which may be sensitive or uncomfortable. If you prefer not to answer certain questions, you are free to decline without any consequences.
                        <br />
                        <br />
                        <strong>Benefits to research participants and others:</strong>
                        <br />
                        By participating, you will be contributing valuable insights that will help refine and improve mental wellness programs. Your input will play a key role in shaping future initiatives that support mental health through artistic expression.
                        <br />
                        <br />
                        <strong>Record keeping and confidentiality:</strong>
                        <br />
                        All survey results will be securely stored in a password-protected Google Drive, accessible only to authorized group members via their designated email accounts. Furthermore, each group member's laptop is also password-protected, ensuring an additional layer of security for the data.
                        <br />
                        <br />
                        Records of your participation in this study will be held confidential so far as permitted by law. However, the study investigators, the sponsor or its designee, and, under certain circumstances, the Worcester Polytechnic Institute Institutional Review Board (WPI IRB) will be able to inspect and have access to confidential data that identify you by name. Any publication or presentation of the data will not identify you.
                        <br />
                        <br />
                        <strong>Compensation or treatment in the event of injury:</strong>
                        <br />
                        At the current moment, the interviewers are unable to offer any form of compensation or treatment in the event of an injury to the participant. However, being a survey, the interview team assesses that the risk of such an injury is extremely low. In any case, you do not give up any of your legal rights by signing this statement.
                        <br />
                        <br />
                        For more information about this research or about the rights of research participants, or in case of research-related injury, contact:
                        <br />
                        <br />
                        <strong>WPI Singapore IQP Research Group</strong>
                        <br />
                        gr-sg-iqp@wpi.edu
                        <br />
                        <br />
                        <strong>WPI IRB Contacts</strong>
                        <br />
                        IRB Manager (Ruth McKeogh, Tel. 508 831-6699, Email: irb@wpi.edu)
                        <br />
                        Human Protection Administrator (Gabriel Johnson, Tel. 508-831-4989, Email: gjohnson@wpi.edu)
                        <br />
                        <br />
                        Your participation in this research is voluntary. You may decide to stop participating in the survey at any time. By continuing, you acknowledge that you have been informed about and consent to be a participant in the study described above. Make sure that your questions are answered to your satisfaction before signing. You are entitled to retain a copy of this consent agreement.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}