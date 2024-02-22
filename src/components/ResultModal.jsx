import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { remainingTime, targetTime, onReset },
  ref
) {
  const userLost = remainingTime <= 0;
  const formattedTimeRemaining = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h1>You lost</h1>}
      {!userLost && <h1>Your score is {score}</h1>}
      <p>
        The target was{" "}
        <strong>
          {targetTime} second
          {targetTime > 1 ? "s" : ""}
        </strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedTimeRemaining} seconds left</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
