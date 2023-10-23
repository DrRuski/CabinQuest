import Form from "../../components/form/form";

export default function Login() {
  return (
    <div className="container m-auto">
      <div className="flex h-screen">
        <div className="flex flex-col md:flex-row justify-center items-center shadow md:w-[800px] md:h-[500px] m-auto">
          <div className="flex flex-col justify-center items-center bg-primary md:w-[400px] md:h-[500px] text-text">
            Hello
          </div>
          <div className="flex flex-col justify-center items-center gap-6 md:w-[400px] md:h-[500px]">
            <div className="flex gap-10">
              <button>Login</button>
              <button>Register</button>
            </div>
            <h1>Please provide your login details.</h1>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}
