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
import { useState } from "react";
import { supabase } from "@/config/supabaseClient";

export function ManageMenu() {
  const [getData, setData] = useState([]);
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
  });
  const [open, setOpen] = useState(0);
  const [file, setFile] = useState(null);

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
        <Dialog size="xs">
          <DialogHeader>Cập nhật món</DialogHeader>
          <DialogBody>
            <form>
              <div className="flex flex-col gap-4">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Tên món
                </Typography>
                <Input
                  type="text"
                  name="name"
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
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Phân loại
                </Typography>
              </div>
              <div className="flex gap-4 mt-4">
                <Button type="submit" color="lightBlue" ripple="dark">
                  Cập nhật
                </Button>
                <Button color="red" buttonType="link" ripple="light">
                  Hủy
                </Button>
              </div>
            </form>
          </DialogBody>
        </Dialog>
      </div>
    </div>
  );
}

export default ManageMenu;
