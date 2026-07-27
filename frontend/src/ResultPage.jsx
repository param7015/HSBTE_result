import { useState } from "react";
import sealImage from "./assets/Screenshot 2026-07-28 003058.png";
import "./ResultPage.css";

const subjects = [
  ["Applied Mathematics-II", "(220022/212822)", "4", "23/40", "23/60", "46/100", "-", "-", "-", "5", "C", "20"],
  ["Applied Physics-II", "(220023/212823)", "3", "36/40", "22/60", "58/100", "36/40", "56/60", "92/100", "8", "A", "24"],
  ["Environmental Studies & Disaster Management", "(220026/212826)", "2", "35/40", "30/60", "65/100", "-", "-", "-", "7", "B+", "14"],
  ["Electronic Instruments & Measurements", "(221021)", "5", "33/40", "20/60", "53/100", "34/40", "54/60", "88/100", "8", "A", "40"],
  ["Electronics Devices & Circuits - I", "(221024/212821)", "5", "30/40", "23/60", "53/100", "34/40", "52/60", "86/100", "8", "A", "40"],
  ["Engineering Graphics", "(220025)", "3", "-", "28/60", "28/60", "30/40", "-", "30/40", "-", "B", "-"],
  ["Electrical & Electronics Workshop - II", "", "2", "-", "-", "-", "26/40", "45/60", "71/100", "8", "A", "16"],
];

function ResultPage() {
  const [rollNumber, setRollNumber] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShow = async () => {
    setLoading(true);
    setMessage("");
    setShowResult(false);
    try {
      const response = await fetch(`https://hsbte-result-backend.onrender.com/api/result?rollNo=${encodeURIComponent(rollNumber.trim())}`);
      const data = await response.json();
      if (response.ok && data.found) setShowResult(true);
      else setMessage(data.message || "Wrong roll number");
    } catch {
      setMessage("Result service is unavailable. Please start the API server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="result-page">
      <section className="lookup-panel">
        <div className="brand" aria-label="HSBTE Haryana State Board Of Technical Education">
          <div className="seal"><img src={sealImage} alt="HSBTE emblem" /></div>
          <div><strong>H S B T E</strong><small>Haryana State Board Of Technical Education</small></div>
        </div>
        <label>Roll Number<span>*</span><input value={rollNumber} onChange={(event) => setRollNumber(event.target.value)} /></label>
        
        <button className="show-button" onClick={handleShow} disabled={loading}>{loading ? "Checking..." : "Show"}</button>
        {message && <p className="lookup-message" role="alert">{message}</p>}
      </section>

      {showResult && <>
      <button className="print-button" onClick={() => window.print()}>Print</button>

      <section className="result-sheet">
        <h1>Haryana State Board of Technical Education</h1>
        <table className="details"><caption>Result of June - 2026 Exam</caption><tbody>
          <tr><th>Roll No:</th><td>250151000146</td></tr>
          <tr><th>Name:</th><td>PRABHJOT SINGH</td></tr>
          <tr><th>Father Name:</th><td>AMARDEEP SINGH</td></tr>
          <tr><th>Institute Name:</th><td>Seth Jai Parkash Polytechnic, VPO- Damla, Distt.-Yamunanagar (015)</td></tr>
          <tr><th>Branch Name:</th><td>ELECTRONICS AND COMMUNICATION ENGINEERING (10)</td></tr>
        </tbody></table>

        <div className="table-scroll"><table className="marks"><caption>Exam Type - 2<sup>nd</sup> SEMESTER Regular</caption>
          <thead><tr><th>Subject</th><th>Credit</th><th>Theory<br />Internal</th><th>External<br />Theory</th><th>Theory<br />Total</th><th>Practical<br />Internal</th><th>External<br />Practical</th><th>Practical<br />Total</th><th>Grade<br />Point</th><th>Letter<br />Grade</th><th>Credit<br />Point</th></tr></thead>
          <tbody>{subjects.map(([name, code, ...marks]) => <tr key={name}><td>{name}<br />{code}</td>{marks.map((mark, index) => <td key={index}>{mark}</td>)}</tr>)}
            <tr className="sessional"><th colSpan="7">Sessional</th><td colSpan="4">367/400</td></tr>
            <tr className="grand-total"><th>Grand Total</th><td>24</td><td colSpan="5"></td><td>670/1000</td><td>-</td><td></td><td>-</td></tr>
          </tbody>
        </table></div>

        <div className="table-scroll"><table className="reappear"><caption>Exam Type - ReChecking</caption><thead><tr><th>Semester</th><th>Subject Name</th><th>External</th><th>Internal</th><th>Total</th></tr></thead><tbody><tr><td>1</td><td>220012/210012 - Applied Mathematics-I</td><td>31/60</td><td>23/40</td><td>54/100</td></tr></tbody></table></div>

        <section className="notice"><h2>Important Notice</h2><ol>
          <li>While preparing the result, due care has been exercised by the Board. However, inadvertent errors cannot be ruled out, and the Board reserves the right to rectify any such error at a later stage.</li>
          <li>This result is subject to the fulfilment of all eligibility conditions and may be altered or modified due to corrections, rechecking, or other processes.</li>
          <li>If a student fails to meet the eligibility conditions, the Board reserves the right to cancel the declared result. This includes cases where a student appears as a Reappear candidate in subject(s) without prior Regular appearance. Institutes must immediately report such cases to the Board for necessary action. No Provisional Certificate is issued to the student in such cases.</li>
          <li>For queries regarding discrepancies or non-declared results, please contact the concerned Institute.</li>
          <li>The notations mentioned in the Letter Grade column are as follows:<br />O – Outstanding, A+ – Excellent, A – Very Good, B+ – Good, B – Above Average, C – Average, P – Pass, F – Fail.</li>
          <li>Students who are not satisfied with their declared result in any subject(s) may apply for rechecking and/or obtain a photocopy of the evaluated answer sheet through their respective Institutes on plain paper up to 15.07.2026 (05:00 PM). No application/request for re-evaluation shall be entertained by the Institute/Board after the closing date.<br />(a) Fee for re-evaluation of the evaluated answer book: Rs. 650/- per subject.<br />(b) Fee for re-evaluation/photocopy of the evaluated answer book after re-evaluation: Rs. 1,000/- per subject.</li>
          <li>Students applying for a photocopy of their evaluated answer sheet(s) must submit an undertaking in the prescribed format available with their respective Institute.</li>
        </ol></section>
        <footer>{new Date().toLocaleString("en-US")}</footer>
      </section>
      </>}
    </main>
  );
}

export default ResultPage;
