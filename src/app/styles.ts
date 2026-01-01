const styleElement = document.createElement("style");

styleElement.textContent = `[aria-label="Use Markdown"] {
  border: thin solid lime;
}
.save-and-archive-NOT {
  background-color: #ff4d4d;
  box-shadow: 0 0 0 0 rgba(255, 77, 77, 0.7);
  animation: pulse-glow 2s infinite cubic-bezier(0.66, 0, 0, 1);
  transition: all 0.3s ease-in-out;
}

[aria-label="kn save"] {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjMDAwMDAwIj48cGF0aCBkPSJtNjQwLTM2MCAxMjAtMTIwLTQyLTQzLTQ4IDQ4di0xMjVoLTYwdjEyNWwtNDgtNDgtNDIgNDMgMTIwIDEyMFpNMTYwLTE2MHEtMzMgMC01Ni41LTIzLjVUODAtMjQwdi00ODBxMC0zMyAyMy41LTU2LjVUMTYwLTgwMGg2NDBxMzMgMCA1Ni41IDIzLjVUODgwLTcyMHY0ODBxMCAzMy0yMy41IDU2LjVUODAwLTE2MEgxNjBabTAtODBoNjQwdi00ODBIMTYwdjQ4MFptMCAwdi00ODAgNDgwWm02MC0xMjBoNjB2LTE4MGg0MHYxMjBoNjB2LTEyMGg0MHYxODBoNjB2LTIwMHEwLTE3LTExLjUtMjguNVQ0NDAtNjAwSDI2MHEtMTcgMC0yOC41IDExLjVUMjIwLTU2MHYyMDBaIi8+PC9zdmc+);
}
[aria-label="kn copy"] {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzFBNzNFOCI+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+CiAgICA8cGF0aCBkPSJNMjAgOGgtMi44MWMtLjQ1LS43OC0xLjA3LTEuNDUtMS44Mi0xLjk2TDE3IDQuNDEgMTUuNTkgM2wtMi4xNyAyLjE3QzEyLjk2IDUuMDYgMTIuNDkgNSAxMiA1Yy0uNDkgMC0uOTYuMDYtMS40MS4xN0w4LjQxIDMgNyA0LjQxbDEuNjIgMS42M0M3Ljg4IDYuNTUgNy4yNiA3LjIyIDYuODEgOEg0djJoMi4wOWMtLjA1LjMzLS4wOS42Ni0uMDkgMXYxSDR2MmgydjFjMCAuMzQuMDQuNjcuMDkgMUg0djJoMi44MWMxLjA0IDEuNzkgMi45NyAzIDUuMTkgM3M0LjE1LTEuMjEgNS4xOS0zSDIwdi0yaC0yLjA5Yy4wNS0uMzMuMDktLjY2LjA5LTF2LTFoMnYtMmgtMnYtMWMwLS4zNC0uMDQtLjY3LS4wOS0xSDIwVjh6bS02IDhoLTR2LTJoNHYyem0wLTRoLTR2LTJoNHYyeiIvPgo8L3N2Zz4K);
}
[aria-label="kn toggle"] {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjMDAwMDAwIj48cGF0aCBkPSJtNjQwLTM2MCAxMjAtMTIwLTQyLTQzLTQ4IDQ4di0xMjVoLTYwdjEyNWwtNDgtNDgtNDIgNDMgMTIwIDEyMFpNMTYwLTE2MHEtMzMgMC01Ni41LTIzLjVUODAtMjQwdi00ODBxMC0zMyAyMy41LTU2LjVUMTYwLTgwMGg2NDBxMzMgMCA1Ni41IDIzLjVUODgwLTcyMHY0ODBxMCAzMy0yMy41IDU2LjVUODAwLTE2MEgxNjBabTAtODBoNjQwdi00ODBIMTYwdjQ4MFptMCAwdi00ODAgNDgwWm02MC0xMjBoNjB2LTE4MGg0MHYxMjBoNjB2LTEyMGg0MHYxODBoNjB2LTIwMHEwLTE3LTExLjUtMjguNVQ0NDAtNjAwSDI2MHEtMTcgMC0yOC41IDExLjVUMjIwLTU2MHYyMDBaIi8+PC9zdmc+);
}
[aria-label="kn archive"] {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDAwIj4KICA8cGF0aCBkPSJNMjAuNTQgNS4yM2wtMS4zOS0xLjY4QzE4Ljg4IDMuMjEgMTguNDcgMyAxOCAzSDZjLS40NyAwLS44OC4yMS0xLjE2LjU1TDMuNDYgNS4yM0MzLjE3IDUuNTcgMyA2LjAyIDMgNi41VjE5YzAgMS4xLjkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJWNi41YzAtLjQ4LS4xNy0uOTMtLjQ2LTEuMjd6TTYuMjQgNWgxMS41MmwuODMgMUg1LjQybC44Mi0xek01IDE5VjhoMTR2MTFINXptMTEtNS41bC00IDQtNC00IDEuNDEtMS40MUwxMSAxMy42N1YxMGgydjMuNjdsMS41OS0xLjU5TDE2IDEzLjV6Ii8+Cjwvc3ZnPgo=);
}
[role="button"].kn {
  direction: ltr;
  font-family: "Roboto", arial, sans-serif;
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
  line-height: 26px;
  cursor: pointer;
  display: inline-block;
  outline: none !important;
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 18px 18px;
  border-radius: 50%;
  border: 1px solid transparent;
  height: 32px;
  margin: 0 8px;
  width: 32px;
  opacity: 0.87;
  background-color: rgba(95, 99, 104, 0.157);
  user-select: none;


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
    /* Expands the shadow and fades its opacity */
    box-shadow: 0 0 0 20px rgba(255, 77, 77, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 77, 77, 0);
  }
}
`;

export { styleElement };
