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
import { supabase } from '@/config/supabaseClient'

export function ManageMenu() {
  const [getData, setData] = useState([]);
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
  });
  const [open, setOpen] = useState(0);

  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.name || !inputs.price) {
      console.log("fail")
      return;
    }
    try {
      
      const { data, error } = await supabase.from('menuCoffe').insert([
        {
          name : inputs.name,
          price: inputs.price,
        }
      ]);
      console.log(data)
      if (error) {
        console.error('Error inserting data:', error.message);
        return;
      }
    } catch (error) {
 
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
            <form >
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
                <Button
                  color="red"
                  buttonType="link"
                  ripple="light"
                >
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
