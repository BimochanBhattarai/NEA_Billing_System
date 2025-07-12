// app/admin/branch/register/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function BranchRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contact: "",
    incharge: "",
    status: "Active"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      status: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Branch registered:", formData);
    alert("Branch registered successfully!");
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <Card className="mx-auto max-w-2xl border border-blue-100 bg-white shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-blue-800">Branch Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-700">
                Branch Name
              </Label>
              <Input 
                id="name"
                name="name"
                placeholder="Enter branch name"
                value={formData.name}
                onChange={handleChange}
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-blue-700">
                Location
              </Label>
              <Select onValueChange={(value) => setFormData({...formData, location: value})}>
                <SelectTrigger className="border-blue-200 focus:border-blue-500">
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent className="border-blue-200 max-h-60 overflow-y-auto">
                  <SelectItem value="achham">Achham</SelectItem>
                  <SelectItem value="arghakhanchi">Arghakhanchi</SelectItem>
                  <SelectItem value="baglung">Baglung</SelectItem>
                  <SelectItem value="baitadi">Baitadi</SelectItem>
                  <SelectItem value="bajhang">Bajhang</SelectItem>
                  <SelectItem value="bajura">Bajura</SelectItem>
                  <SelectItem value="banke">Banke</SelectItem>
                  <SelectItem value="bara">Bara</SelectItem>
                  <SelectItem value="bardiya">Bardiya</SelectItem>
                  <SelectItem value="bhaktapur">Bhaktapur</SelectItem>
                  <SelectItem value="bhojpur">Bhojpur</SelectItem>
                  <SelectItem value="chitwan">Chitwan</SelectItem>
                  <SelectItem value="dadeldhura">Dadeldhura</SelectItem>
                  <SelectItem value="dailekh">Dailekh</SelectItem>
                  <SelectItem value="dang">Dang</SelectItem>
                  <SelectItem value="darchula">Darchula</SelectItem>
                  <SelectItem value="dhading">Dhading</SelectItem>
                  <SelectItem value="dhankuta">Dhankuta</SelectItem>
                  <SelectItem value="dhanusa">Dhanusa</SelectItem>
                  <SelectItem value="dolakha">Dolakha</SelectItem>
                  <SelectItem value="dolpa">Dolpa</SelectItem>
                  <SelectItem value="doti">Doti</SelectItem>
                  <SelectItem value="gorkha">Gorkha</SelectItem>
                  <SelectItem value="gulmi">Gulmi</SelectItem>
                  <SelectItem value="humla">Humla</SelectItem>
                  <SelectItem value="ilam">Ilam</SelectItem>
                  <SelectItem value="jajarkot">Jajarkot</SelectItem>
                  <SelectItem value="jhapa">Jhapa</SelectItem>
                  <SelectItem value="jumla">Jumla</SelectItem>
                  <SelectItem value="kailali">Kailali</SelectItem>
                  <SelectItem value="kalikot">Kalikot</SelectItem>
                  <SelectItem value="kanchanpur">Kanchanpur</SelectItem>
                  <SelectItem value="kapilvastu">Kapilvastu</SelectItem>
                  <SelectItem value="kaski">Kaski</SelectItem>
                  <SelectItem value="kathmandu">Kathmandu</SelectItem>
                  <SelectItem value="kavrepalanchok">Kavrepalanchok</SelectItem>
                  <SelectItem value="khotang">Khotang</SelectItem>
                  <SelectItem value="lalitpur">Lalitpur</SelectItem>
                  <SelectItem value="lamjung">Lamjung</SelectItem>
                  <SelectItem value="mahottari">Mahottari</SelectItem>
                  <SelectItem value="makwanpur">Makwanpur</SelectItem>
                  <SelectItem value="manang">Manang</SelectItem>
                  <SelectItem value="morang">Morang</SelectItem>
                  <SelectItem value="mugu">Mugu</SelectItem>
                  <SelectItem value="mustang">Mustang</SelectItem>
                  <SelectItem value="myagdi">Myagdi</SelectItem>
                  <SelectItem value="nawalparasi">Nawalparasi</SelectItem>
                  <SelectItem value="nuwakot">Nuwakot</SelectItem>
                  <SelectItem value="okhaldhunga">Okhaldhunga</SelectItem>
                  <SelectItem value="palpa">Palpa</SelectItem>
                  <SelectItem value="panchthar">Panchthar</SelectItem>
                  <SelectItem value="parbat">Parbat</SelectItem>
                  <SelectItem value="parsa">Parsa</SelectItem>
                  <SelectItem value="pyuthan">Pyuthan</SelectItem>
                  <SelectItem value="ramechhap">Ramechhap</SelectItem>
                  <SelectItem value="rasuwa">Rasuwa</SelectItem>
                  <SelectItem value="rautahat">Rautahat</SelectItem>
                  <SelectItem value="rolpa">Rolpa</SelectItem>
                  <SelectItem value="rukum">Rukum</SelectItem>
                  <SelectItem value="rupandehi">Rupandehi</SelectItem>
                  <SelectItem value="salyan">Salyan</SelectItem>
                  <SelectItem value="sankhuwasabha">Sankhuwasabha</SelectItem>
                  <SelectItem value="saptari">Saptari</SelectItem>
                  <SelectItem value="sarlahi">Sarlahi</SelectItem>
                  <SelectItem value="sindhuli">Sindhuli</SelectItem>
                  <SelectItem value="sindhupalchok">Sindhupalchok</SelectItem>
                  <SelectItem value="siraha">Siraha</SelectItem>
                  <SelectItem value="solukhumbu">Solukhumbu</SelectItem>
                  <SelectItem value="sunsari">Sunsari</SelectItem>
                  <SelectItem value="surkhet">Surkhet</SelectItem>
                  <SelectItem value="syangja">Syangja</SelectItem>
                  <SelectItem value="tanahu">Tanahu</SelectItem>
                  <SelectItem value="taplejung">Taplejung</SelectItem>
                  <SelectItem value="terhathum">Terhathum</SelectItem>
                  <SelectItem value="udayapur">Udayapur</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact" className="text-blue-700">
                Contact Details
              </Label>
              <Input
                id="contact"
                name="contact"
                placeholder="Enter contact number"
                value={formData.contact}
                onChange={handleChange}
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="incharge" className="text-blue-700">
                Incharge Name
              </Label>
              <Input
                id="incharge"
                name="incharge"
                placeholder="Enter incharge name"
                value={formData.incharge}
                onChange={handleChange}
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-blue-700">Status</Label>
              <Select onValueChange={handleSelectChange} value={formData.status}>
                <SelectTrigger className="border-blue-200 focus:border-blue-500">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="border-blue-200">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Link href="/admin/branches" passHref>
                <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                  Cancel
                </Button>
              </Link>
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add Branch
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}