import { useEffect, useState } from "react";
import { supabase } from "@/config/supabaseClient";
import {
  Card,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

export function ManageUser() {
  const [getDataUser, setDataUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [dataUpdates, setDataUpdates] = useState(null);
  const [inputs, setInputs] = useState({
    email: "",
    full_name: "",
    role: "",
  });
  const [getRequesh, setRequesh] = useState(0);
  console.log(inputs);
  useEffect(() => {
    async function fetchData() {
      let { data: profiles, error } = await supabase
        .from("profiles")
        .select("*");
      setDataUser(profiles);
    }
    fetchData();
  }, [getRequesh]);
  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  const handleOpenCreate = (value) =>
    setOpenCreate(openCreate === value ? 0 : value);
  const handleOpen = () => setOpen(!open);
  const openView = async (e) => {
    console.log(e);
    setOpen(!open);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", e);
    if (data && data.length > 0) {
      console.log("oke");
      setDataUpdates(data[0]);
      setOpen(!open);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.email || !inputs.full_name || !inputs.role) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    } else {
      const { data, error } = await supabase.from("profiles").insert([
        {
          email: inputs.email,
          full_name: inputs.full_name,
          role: inputs.role,
        },
      ]);
      console.log(data);
      setRequesh(getRequesh + 1);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(dataUpdates);
    const { data, error } = await supabase
      .from("profiles")
      .update({
        full_name: inputs.full_name ? inputs.full_name : dataUpdates.full_name,
        role: inputs.role ? inputs.role : dataUpdates.role,
      })
      .eq("id", dataUpdates.id);
    setOpen(!open);
    setRequesh(getRequesh + 1);
  };
  return (
    <div className="mt-10">
      <div className="flex flex-col">
        <div className="overflow-x-auto -my-2 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <Accordion open={openCreate === 1}>
                <AccordionHeader onClick={() => handleOpenCreate(1)}>
                  Bạn muốn tạo thêm món?
                </AccordionHeader>
                <AccordionBody>
                  <form className="my-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Name
                      </Typography>
                      <Input
                        type="text"
                        name="full_name"
                        onChange={handleInput}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Email
                      </Typography>
                      <Input
                        type="email"
                        name="email"
                        onChange={handleInput}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      <select
                        id="countries"
                        name="role"
                        onChange={handleInput}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected="">Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                      <Button type="submit" color="lightBlue">
                        Thêm món
                      </Button>
                    </div>
                  </form>
                </AccordionBody>
              </Accordion>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getDataUser.map((item, index) => (
                    <tr key={index}>
                      <td className="py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.full_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="  whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className=" py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {item.role}
                        </span>
                      </td>

                      <td className="py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="bg-gray-500 text-white px-4 py-2 border rounded-md hover:bg-green-600"
                          onClick={() => openView(item.id)}
                        >
                          Edit
                        </button>
                        <button className="bg-gray-500 text-white px-4 py-2 border rounded-md hover:bg-red-600 ml-2">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {dataUpdates && (
                <Dialog open={open} size="xs" handler={handleOpen}>
                  <DialogHeader>Update</DialogHeader>
                  <DialogBody>
                    <form className="max-w-md mx-auto">
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="email"
                          name="email"
                          id="floating_email"
                          onChange={handleInput}
                          value={dataUpdates.email}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required=""
                        />
                        <label
                          htmlFor="floating_email"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Email address
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="full_name"
                          onChange={handleInput}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required=""
                          defaultValue={dataUpdates.full_name}
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Full name
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <select
                          id="countries"
                          name="role"
                          onChange={handleInput}
                          defaultValue={dataUpdates.role}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option selected="">Role</option>
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        onClick={handleUpdate}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Submit
                      </button>
                    </form>
                  </DialogBody>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUser;
