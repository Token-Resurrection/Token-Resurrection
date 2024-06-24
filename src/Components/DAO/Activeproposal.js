"use client"
import React,{useState} from "react";
import propstyle from "./proposals.module.css";
import Modal from "react-modal";
import formstyle from "../SubmitDao/stepfrom.module.css";


const dummyData = [
  { proposal: "Proposal 1", token: "Token A", status: "Active" },
  { proposal: "Proposal 2", token: "Token B", status: "Pending" },
  { proposal: "Proposal 3", token: "Token C", status: "Completed" },
  // Add more dummy data as needed
];

// Modal.setAppElement('#root'); 

function Activeproposal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const openModal = (data) => {
    setSelectedData(data);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedData(null);
  };
  return (
    <div className={propstyle.outerdivprop1}>
      <div className={propstyle.maindivofproposal1}>
        <div className={propstyle.headingprop}>Active Proposal</div>
        <div className={propstyle.tablediv}>
          <table>
            <thead className="text-center">
              <tr>
                <th>Proposal</th>
                <th>Token</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {dummyData.map((item, index) => (
                <tr key={index}>
                  <td>{item.proposal}</td>
                  <td>{item.token}</td>
                  <td>
                    <button onClick={() => openModal(item)}>View</button>
                  </td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Proposal Details"
        className={propstyle.modal}
        overlayClassName={propstyle.overlay}
      >
        {selectedData && (
          <div>
            <div className={propstyle.headingprop}>Proposal Details</div>
            <div className={propstyle.divdetail}>
              <div className={propstyle.titledetail}>Proposal Name</div>
              <div className={propstyle.titlecontent}>{selectedData.proposal}</div>
            </div>
            <div className={propstyle.divdetail}>
              <div className={propstyle.titledetail}>Contract Address</div>
              <div className={propstyle.titlecontent}>0xEd154b193FabDb2ef502Edb98284005CF148516</div>
            </div>
            <div className="flex">
            <div className={propstyle.divdetail}>
              <div className={propstyle.titledetail}>Token Name</div>
              <div className={propstyle.titlecontent}>{selectedData.token}</div>
            </div>
            <div className={propstyle.divdetail}>
              <div className={propstyle.titledetail}>Status</div>
              <div className={propstyle.titlecontent}>{selectedData.status}</div>
            </div>
            </div>
            <div className={propstyle.divdetail}>
              <div className={propstyle.titledetail}>Address</div>
              <div className={propstyle.titlecontent}>0xEd154b193FabDb2ef502Edb98284005CF148516</div>
            </div>
            <div className="flex justify-around">
            <button className={propstyle.buttonin2step}>Accept</button>
            <button className={propstyle.buttonin3step} onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Activeproposal;
