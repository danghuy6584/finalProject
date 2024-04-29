import { useEffect } from "react";
import { useState } from "react";
import {
  Card,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { supabase } from "@/config/supabaseClient";

export function Sales() {
  const [getDataCheckout, setDataCheckout] = useState([]);
  const [open, setOpen] = useState(false);
  const [checkoutsID, setCheckoutsID] = useState([]);
  const [total, setTotal] = useState(0);
  const TABLE_HEAD = ["Name", "Price", "Quantity", "Amount"];
  useEffect(() => {
    async function fetchData() {
      let { data: order, error } = await supabase.from("order").select(`
        id,
        created_at,
        user_id (
          email
        )
      `);
      setDataCheckout(order);
      console.log(order, error);
    }
    fetchData();
  }, []);

  const openView = async (e) => {
    console.log(e);
    const { data, error } = await supabase
      .from("orderDetail")
      .select(
        `
      created_at,
      id,
      menu_id (
        name,
        price
      ),
      quantity
    `
      )
      .eq("order_id", e);
    console.log(data, error);
    if (data) {
      setCheckoutsID(data);
      setOpen(!open);

      const total = data
        .map((item) => {
          const price = item.menu_id.price;
          const quantity = item.quantity;
          return price * quantity;
        })
        .reduce((acc, subtotal) => acc + subtotal, 0);
      setTotal(total);
    }
  };
  const handleOpen = () => setOpen(!open);
  const formatDate = (date) => {
    // Format date to dd/mm/yyyy & hh:mm:ss
    const d = new Date(date);
    const formattedDate = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    return formattedDate;
  };
  const formatNumber = (value) => {
    // Format number
    const formatter = new Intl.NumberFormat("vi-VN");
    return formatter.format(value);
  };
  return (
    <div className="mx-full px-4 pt-8">
      <h2 className="text-2xl py-4 font-bold tracking-tight text-gray-900">
        Thông tin đơn hàng
      </h2>
      <Card className="h-screen w-full  overflow-auto">
        <table className="w-full min-w-max table-auto text-right">
          <thead className="sticky top-0 bg-gray-800 text-white">
            <tr>
              <th className="py-4 px-6 text-center">ID</th>
              <th className="py-4 px-6 text-center">EMAIL USER</th>
              <th className="py-4 px-6">CREATE AT</th>
            </tr>
          </thead>
          <tbody>
            {getDataCheckout.map((items) => (
              <tr
                key={items.id}
                onClick={() => openView(items.id)}
                className="bg-gray-100 border-b border-gray-200 hover:bg-white text-black"
              >
                <td className="py-4 px-6 text-right">{items.id}</td>
                <td className="py-4 px-6 text-right ">{items.user_id.email}</td>
                <td className="py-4 px-6 text-right">
                  {formatDate(items.created_at)}
                </td>
                {/* <td className="py-4 px-6 text-center">
                  <Button
                    // onClick={() => openView(items._id)}
                    variant="gradient"
                  >
                    Xem chi tiết
                  </Button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Dialog open={open} size="xs" handler={handleOpen}>
        <DialogHeader>Invoice details </DialogHeader>
        <DialogBody>
          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {checkoutsID.map((items, index) => {
                  const isLast = index === items.length - 1;
                  const classes = isLast;
                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal mx-4"
                        >
                          {items.menu_id.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {items.menu_id.price}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {items.quantity}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formatNumber(items.quantity * items.menu_id.price)}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
          <div className="text-black font-bold text-right mx-10">
            Total: {formatNumber(total)}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Đóng</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Sales;
