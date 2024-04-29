import "./ManageMenu.scss";
import {
  Card,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
  Typography,
  Button,
  Spinner,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { supabase } from "@/config/supabaseClient";

export function ManageMenu() {
  const [getData, setData] = useState([]);
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
  });
  const [dataUpdates, setDataUpdates] = useState(null);
  const [open, setOpen] = useState(0);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [getRequesh, setRequesh] = useState(0);
  useEffect(() => {
    async function fetchData() {
      let { data: menuCoffe, error } = await supabase
        .from("menuCoffe")
        .select("*");
      setData(menuCoffe);
      if (menuCoffe) setLoading(false);
    }
    fetchData();
  }, [getRequesh]);
  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const handleImg = (e) => {
    console.log(e.target.files[0]);
    const selectedFile = e.target.files[0];
    handleImgBucket(selectedFile);
    setFile(selectedFile);
  };
  const handleImgBucket = async (file) => {
    const { data, error } = await supabase.storage
      .from("menuImage")
      .upload(file.name, file);
    if (error) {
      console.log(error);
    }
  };
  console.log(file);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.name || !inputs.price) {
      console.log("fail");
      return;
    }
    try {
      const { data, error } = await supabase.from("menuCoffe").insert([
        {
          name: inputs.name,
          price: inputs.price,
          image:
            "https://sbopxwomrmjltrjvurhf.supabase.co/storage/v1/object/public/menuImage/" +
            file.name,
        },
      ]);
      console.log(data);
      if (error) {
        console.error("Error inserting data:", error.message);
        return;
      }
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  };
  const openView = async (e) => {
    console.log(e);
    const { data, error } = await supabase
      .from("menuCoffe")
      .select("*")
      .eq("_id", e);
    console.log(data, error);
    if (data && data.length > 0) {
      console.log("oke");
      setDataUpdates(data[0]);
      setOpen(!open);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("menuCoffe")
      .update({
        name: inputs.name ? inputs.name : dataUpdates.name,
        price: inputs.price ? inputs.price : dataUpdates.price,
        image:
          file && file.name
            ? "https://sbopxwomrmjltrjvurhf.supabase.co/storage/v1/object/public/menuImage/" +
              file.name
            : dataUpdates.image,
      })
      .eq("_id", dataUpdates._id);
    setOpen(!open);
    setRequesh(getRequesh + 1);
  };
  const handleDelete = async (e) => {
    const { error } = await supabase.from("menuCoffe").delete().eq("_id", e);
    console.log(error);
    setRequesh(getRequesh + 1);
  };
  const formatMoney = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  console.log(dataUpdates);
  return (
    <div className="">
      <div className="mx-full px-4 pt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Quản lý menu
        </h2>
        <Accordion open={open === 1}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            Bạn muốn tạo thêm món?
          </AccordionHeader>
          <AccordionBody>
            <form onSubmit={handleSubmit} className="my-4">
              <div className="flex flex-col gap-4">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Tên món
                </Typography>
                <Input
                  type="text"
                  name="name"
                  onChange={handleInput}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Giá
                </Typography>
                <Input
                  type="number"
                  name="price"
                  onChange={handleInput}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleImg}
                    />
                  </label>
                </div>
                <Button type="submit" color="lightBlue">
                  Thêm món
                </Button>
              </div>
            </form>
          </AccordionBody>
        </Accordion>
        <Card className="h-screen w-full overflow-auto mt-2">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="sticky top-0 bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Image</th>
                <th className="py-4 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    <Spinner
                      color="blue"
                      size="large"
                      className="h-12 w-12 justify-between mx-auto mt-32"
                    />
                  </td>
                </tr>
              ) : (
                getData.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-4 px-6">{item.name}</td>
                    <td className="py-4 px-6">{formatMoney(item.price)}</td>
                    <td className="py-4 px-6">
                      <img
                        className="h-40 w-60 object-cover rounded-xl"
                        src={item.image}
                        alt=""
                      />
                    </td>
                    <td className="py-4 px-6">
                      <button
                        className="bg-gray-500 text-white px-4 py-2 border rounded-md hover:bg-green-600"
                        onClick={() => openView(item._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-gray-500 text-white px-4 py-2 border rounded-md hover:bg-red-600 ml-2"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Card>
        {dataUpdates && (
          <Dialog open={open} size="xs" handler={handleOpen}>
            <DialogHeader>UPDATE COFFEE</DialogHeader>
            <DialogBody>
              <form>
                <div className="flex flex-col gap-4">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Name
                  </Typography>
                  <Input
                    type="text"
                    name="name"
                    onChange={handleInput}
                    defaultValue={dataUpdates.name}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Price
                  </Typography>
                  <Input
                    type="number"
                    name="price"
                    onChange={handleInput}
                    defaultValue={dataUpdates.price}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    IMAGE
                  </Typography>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <img
                        src={dataUpdates.image}
                        className="w-20 h-20"
                        alt=""
                      />
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleImg}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <Button
                    type="submit"
                    color="lightBlue"
                    ripple="dark"
                    onClick={handleUpdate}
                  >
                    Cập nhật
                  </Button>
                  <Button
                    color="red"
                    buttonType="link"
                    ripple="light"
                    onClick={() => setOpen(!open)}
                  >
                    Hủy
                  </Button>
                </div>
              </form>
            </DialogBody>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default ManageMenu;
