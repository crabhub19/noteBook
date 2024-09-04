import React from "react";

export default function Alert(props) {
  return (
    
    props.alert && (
      <div>
        <div
          id="alert-border-1"
          className= {`flex items-center p-1 ${props.alert.type==="error"?'text-red-800 border-red-500 bg-red-200 dark:text-red-700 dark:bg-gray-800 dark:border-red-900':'text-green-800 border-green-500 bg-green-200 dark:text-green-700 dark:bg-gray-800 dark:border-green-900'} border-t-4  justify-center`}
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div className="ms-3 text-sm font-medium">
            <b>{props.alert.type}: </b>
            <i><strong>{props.alert.msg}</strong></i>
          </div>
        </div>
      </div>
    )
  );
}
