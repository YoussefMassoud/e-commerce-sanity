import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Card from "../components/Card";

export default function Shop() {
  return (
    <div className="flex flex-row">
    <div className="flex  flex-col ">
      {/* Home / Shop start */}
      <div className="flex mt-20 flex-col justify-start gap-1 lg:px-12 px-4">
        <div className="flex flex-row gap-2">
          Home
          <p className="text-gray-400">/</p>
        </div>
        <h1 className="text-xl font-bold">Shop</h1>
      </div>
      {/* Home / Shop end */}
      <div className="border-t-2 flex flex-col justify-start lg:px-12 px-4 mt-4 border-gray-200">
        <h1 className="text-lg font-bold mt-4">Filter by</h1>

        <div className="flex flex-col mt-2 ">
          <Label className="font-semibold ">Discounts</Label>
          <div className="flex items-center space-x-2 mt-3">
            <Checkbox  />
            <Label  className="px-2">
              On Sale
            </Label>
          </div>
        </div>

        <div className="border-t-2 mt-4 border-gray-200"></div>

        <div className="flex flex-col mt-4">
          <Label className="font-semibold">Size</Label>
          <div className="flex items-center space-x-2 mt-3">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="px-2">
              md
            </Label>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="px-2">
              L
            </Label>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="px-2">
              XL
            </Label>
          </div>
        </div>

        <div className="border-t-2 mt-4 border-gray-200"></div>

        <div className=" flex flex-col mt-4">
          <Label>Price</Label>
          <div className="flex items-center space-x-2 mt-3 ">
            <div className="flex flex-col space-y-2">
              <Label className="font-semibold">From</Label>
              <Input placeholder="EGP 0" />
            </div>

            <div className="flex flex-col space-y-2">
              <Label className="font-semibold">To</Label>
              <Input placeholder="EGP 0" />
            </div>
          </div>
        </div>
      </div>
    </div>    
    <Card />

    </div>
  );
}
