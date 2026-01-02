const styleElement = document.createElement("style");

styleElement.textContent = `[role="button"].kn {
  direction: ltr;
  font-family: "Roboto", arial, sans-serif;
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
  line-height: 26px;
  cursor: pointer;
  display: inline-block;
  height: 32px;
  margin: 0 8px;
  width: 32px;
  opacity: 0.87;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  border-radius: 50%;
  &:hover {
    background-color: #ccc;
  }
}
.kn.panel {
  background: white;
  position: absolute;
  top: 20px;
  left: 20px;
  display: none;
  &.open {
    display: flex;
  }
}
div[role="button"].kn.file-copy {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjMDAwMDAwIj48cGF0aCBkPSJNNzYwLTIwMEgzMjBxLTMzIDAtNTYuNS0yMy41VDI0MC0yODB2LTU2MHEwLTMzIDIzLjUtNTYuNVQzMjAtOTIwaDI4MGwyNDAgMjQwdjQwMHEwIDMzLTIzLjUgNTYuNVQ3NjAtMjAwWk01NjAtNjQwdi0yMDBIMzIwdjU2MGg0NDB2LTM2MEg1NjBaTTE2MC00MHEtMzMgMC01Ni41LTIzLjVUODAtMTIwdi01NjBoODB2NTYwaDQ0MHY4MEgxNjBabTE2MC04MDB2MjAwLTIwMCA1NjAtNTYwWiIgLz48L3N2Zz4=);
}
div[role="button"].kn.file-save {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjMDAwMDAwIj48cGF0aCBkPSJtNzIwLTEyMCAxNjAtMTYwLTU2LTU2LTY0IDY0di0xNjdoLTgwdjE2N2wtNjQtNjQtNTYgNTYgMTYwIDE2MFpNNTYwIDB2LTgwaDMyMFYwSDU2MFpNMjQwLTE2MHEtMzMgMC01Ni41LTIzLjVUMTYwLTI0MHYtNTYwcTAtMzMgMjMuNS01Ni41VDI0MC04ODBoMjgwbDI0MCAyNDB2MTIxaC04MHYtODFINDgwdi0yMDBIMjQwdjU2MGgyNDB2ODBIMjQwWm0wLTgwdi01NjAgNTYwWiIgLz48L3N2Zz4=);
}
div[role="button"].kn.done-outline {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjMDAwMDAwIj48cGF0aCBkPSJtMzgxLTI0MCA0MjQtNDI0LTU3LTU2LTM2OCAzNjctMTY5LTE3MC01NyA1NyAyMjcgMjI2Wm0wIDExM0w0Mi00NjZsMTY5LTE3MCAxNzAgMTcwIDM2Ni0zNjcgMTcyIDE2OC01MzggNTM4WiIgLz48L3N2Zz4=);
}
div[role="button"].kn.download-for-offline {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjMDAwMDAwIj48cGF0aCBkPSJNMjgwLTI4MGg0MDB2LTgwSDI4MHY4MFptMjAwLTEyMCAxNjAtMTYwLTU2LTU2LTY0IDYydi0xNjZoLTgwdjE2NmwtNjQtNjItNTYgNTYgMTYwIDE2MFptMCAzMjBxLTgzIDAtMTU2LTMxLjVUMTk3LTE5N3EtNTQtNTQtODUuNS0xMjdUODAtNDgwcTAtODMgMzEuNS0xNTZUMTk3LTc2M3E1NC01NCAxMjctODUuNVQ0ODAtODgwcTgzIDAgMTU2IDMxLjVUNzYzLTc2M3E1NCA1NCA4NS41IDEyN1Q4ODAtNDgwcTAgODMtMzEuNSAxNTZUNzYzLTE5N3EtNTQgNTQtMTI3IDg1LjVUNDgwLTgwWm0wLTgwcTEzNCAwIDIyNy05M3Q5My0yMjdxMC0xMzQtOTMtMjI3dC0yMjctOTNxLTEzNCAwLTIyNyA5M3QtOTMgMjI3cTAgMTM0IDkzIDIyN3QyMjcgOTNabTAtMzIwWiIgLz48L3N2Zz4=);
}
div[role="button"].kn.markdown-copy {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjMDAwMDAwIj48cGF0aCBkPSJNMzYwLTI0MHEtMzMgMC01Ni41LTIzLjVUMjgwLTMyMHYtNDgwcTAtMzMgMjMuNS01Ni41VDM2MC04ODBoMzYwcTMzIDAgNTYuNSAyMy41VDgwMC04MDB2NDgwcTAgMzMtMjMuNSA1Ni41VDcyMC0yNDBIMzYwWm0wLTgwaDM2MHYtNDgwSDM2MHY0ODBaTTIwMC04MHEtMzMgMC01Ni41LTIzLjVUMTIwLTE2MHYtNTYwaDgwdjU2MGg0NDB2ODBIMjAwWm0yMTAtMzYwaDYwdi0xODBoNDB2MTIwaDYwdi0xMjBoNDB2MTgwaDYwdi0yMDBxMC0xNy0xMS41LTI4LjVUNjMwLTY4MEg0NTBxLTE3IDAtMjguNSAxMS41VDQxMC02NDB2MjAwWm0tNTAgMTIwdi00ODAgNDgwWiIgLz48L3N2Zz4=);
}
.pulsing-button:hover {
  background-color: #e60000;
}
@keyframes pulse-glow {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 77, 77, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 20px rgba(255, 77, 77, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 77, 77, 0);
  }
}
`;

export { styleElement };
