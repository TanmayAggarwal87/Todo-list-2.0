import React from "react";

const TodoAuthPattern = ({ title, subtitle }) => {
  const todoItems = [
    { text: "Complete project", checked: true, top: "10%", left: "10%" },
    { text: "Buy groceries", checked: false, top: "25%", left: "60%" },
    { text: "Call mom", checked: true, top: "45%", left: "30%" },
    { text: "Schedule meeting", checked: false, top: "65%", left: "15%" },
    { text: "Read book", checked: false, top: "30%", left: "75%" },
    { text: "Workout", checked: true, top: "55%", left: "50%" },
    { text: "Pay bills", checked: false, top: "15%", left: "70%" },
    { text: "Plan weekend", checked: true, top: "40%", left: "10%" },
    { text: "Review code", checked: false, top: "20%", left: "40%" },
    { text: "Write docs", checked: true, top: "60%", left: "80%" },
    { text: "Fix bugs", checked: false, top: "35%", left: "55%" },
    { text: "Deploy app", checked: false, top: "70%", left: "35%" }
  ];

  return (
    <div className="hidden lg:flex w-full h-screen items-center justify-center bg-base-200 p-12">
      <div className="w-full max-w-4xl text-center">
        <div className="relative h-[500px] w-full mb-8 overflow-hidden rounded-2xl bg-primary/10">
          {todoItems.map((item, i) => (
            <div
              key={i}
              className={`absolute flex items-center p-3 rounded-lg bg-accent text-base-content shadow-lg ${
                item.checked ? "border-l-4 border-neutral" : "border-l-4 border-primary"
              } ${i % 3 === 0 ? "animate-bounce" : ""} ${
                i % 5 === 0 ? "animate-float-slow" : "animate-float"
              }`}
              style={{
                top: item.top,
                left: item.left,
                width: "210px",
                animationDuration: `${3 + (i % 5)}s`,
                zIndex: i % 2 === 0 ? 10 : 20
              }}
            >
              <input
                type="checkbox"
                className="checkbox checkbox-md mr-3"
                checked={item.checked}
                readOnly
              />
              <span
                className={`text-sm ${
                  item.checked ? "line-through text-base-content/60" : "text-base-content/100"
                }`}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default TodoAuthPattern;
