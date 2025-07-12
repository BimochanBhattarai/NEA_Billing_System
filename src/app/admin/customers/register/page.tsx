"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export default function CustomerRegistrationForm() {
	const [date, setDate] = useState<Date>();
	const [demandType, setDemandType] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log("Form submitted");
	};

	return (
		<div className="min-h-screen bg-white p-4 md:p-8">
			<Card className="mx-auto max-w-2xl border border-blue-100 bg-white shadow-sm">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-blue-800">
						Customer Registration
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="fullName" className="text-blue-700">
								Full Name
							</Label>
							<Input
								id="fullName"
								placeholder="Enter full name"
								className="border-blue-200 focus:border-blue-500"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="address" className="text-blue-700">
								Address
							</Label>
							<Input
								id="address"
								placeholder="Enter address"
								className="border-blue-200 focus:border-blue-500"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="mobileNo" className="text-blue-700">
								Mobile No.
							</Label>
							<Input
								id="mobileNo"
								placeholder="Enter mobile number"
								className="border-blue-200 focus:border-blue-500"
							/>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="citizenshipNo"
								className="text-blue-700"
							>
								Citizenship No.
							</Label>
							<Input
								id="citizenshipNo"
								placeholder="Enter citizenship number"
								className="border-blue-200 focus:border-blue-500"
							/>
						</div>

						<div className="space-y-2">
							<Label className="text-blue-700">
								Date of birth
							</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										className={cn(
											"w-full justify-start text-left font-normal border-blue-200",
											!date && "text-muted-foreground"
										)}
									>
										<CalendarIcon className="mr-2 h-4 w-4 text-blue-600" />
										{date ? (
											format(date, "PPP")
										) : (
											<span>Pick a date</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="single"
										selected={date}
										onSelect={setDate}
										initialFocus
										className="border-blue-200"
									/>
								</PopoverContent>
							</Popover>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="demandType"
								className="text-blue-700"
							>
								Demand Type
							</Label>
							<Select onValueChange={setDemandType}>
								<SelectTrigger className="border-blue-200 focus:border-blue-500">
									<SelectValue placeholder="Select demand type" />
								</SelectTrigger>
								<SelectContent className="border-blue-200">
									<SelectItem value="industrial">
										Industrial (30 A)
									</SelectItem>
									<SelectItem value="commercial">
										Commercial (15 A)
									</SelectItem>
									<SelectItem value="residential">
										Residential (5 A)
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="nearestBranch"
								className="text-blue-700"
							>
								Nearest Branch
							</Label>
							<Select>
								<SelectTrigger className="border-blue-200 focus:border-blue-500">
									<SelectValue placeholder="Select your district" />
								</SelectTrigger>
								<SelectContent className="border-blue-200 max-h-60 overflow-y-auto">
									<SelectItem value="achham">
										Achham
									</SelectItem>
									<SelectItem value="arghakhanchi">
										Arghakhanchi
									</SelectItem>
									<SelectItem value="baglung">
										Baglung
									</SelectItem>
									<SelectItem value="baitadi">
										Baitadi
									</SelectItem>
									<SelectItem value="bajhang">
										Bajhang
									</SelectItem>
									<SelectItem value="bajura">
										Bajura
									</SelectItem>
									<SelectItem value="banke">Banke</SelectItem>
									<SelectItem value="bara">Bara</SelectItem>
									<SelectItem value="bardiya">
										Bardiya
									</SelectItem>
									<SelectItem value="bhaktapur">
										Bhaktapur
									</SelectItem>
									<SelectItem value="bhojpur">
										Bhojpur
									</SelectItem>
									<SelectItem value="chitwan">
										Chitwan
									</SelectItem>
									<SelectItem value="dadeldhura">
										Dadeldhura
									</SelectItem>
									<SelectItem value="dailekh">
										Dailekh
									</SelectItem>
									<SelectItem value="dang">Dang</SelectItem>
									<SelectItem value="darchula">
										Darchula
									</SelectItem>
									<SelectItem value="dhading">
										Dhading
									</SelectItem>
									<SelectItem value="dhankuta">
										Dhankuta
									</SelectItem>
									<SelectItem value="dhanusa">
										Dhanusa
									</SelectItem>
									<SelectItem value="dholkha">
										Dolakha
									</SelectItem>
									<SelectItem value="dolpa">Dolpa</SelectItem>
									<SelectItem value="doti">Doti</SelectItem>
									<SelectItem value="gorkha">
										Gorkha
									</SelectItem>
									<SelectItem value="gulmi">Gulmi</SelectItem>
									<SelectItem value="humla">Humla</SelectItem>
									<SelectItem value="ilam">Ilam</SelectItem>
									<SelectItem value="jajarkot">
										Jajarkot
									</SelectItem>
									<SelectItem value="jhapa">Jhapa</SelectItem>
									<SelectItem value="jumla">Jumla</SelectItem>
									<SelectItem value="kailali">
										Kailali
									</SelectItem>
									<SelectItem value="kalikot">
										Kalikot
									</SelectItem>
									<SelectItem value="kanchanpur">
										Kanchanpur
									</SelectItem>
									<SelectItem value="kapilvastu">
										Kapilvastu
									</SelectItem>
									<SelectItem value="kaski">Kaski</SelectItem>
									<SelectItem value="kathmandu">
										Kathmandu
									</SelectItem>
									<SelectItem value="kavrepalanchok">
										Kavrepalanchok
									</SelectItem>
									<SelectItem value="khotang">
										Khotang
									</SelectItem>
									<SelectItem value="lalitpur">
										Lalitpur
									</SelectItem>
									<SelectItem value="lamjung">
										Lamjung
									</SelectItem>
									<SelectItem value="mahottari">
										Mahottari
									</SelectItem>
									<SelectItem value="makwanpur">
										Makwanpur
									</SelectItem>
									<SelectItem value="manang">
										Manang
									</SelectItem>
									<SelectItem value="morang">
										Morang
									</SelectItem>
									<SelectItem value="mugu">Mugu</SelectItem>
									<SelectItem value="mustang">
										Mustang
									</SelectItem>
									<SelectItem value="myagdi">
										Myagdi
									</SelectItem>
									<SelectItem value="nawalparasi">
										Nawalparasi
									</SelectItem>
									<SelectItem value="nuwakot">
										Nuwakot
									</SelectItem>
									<SelectItem value="okhaldhunga">
										Okhaldhunga
									</SelectItem>
									<SelectItem value="palpa">Palpa</SelectItem>
									<SelectItem value="panchthar">
										Panchthar
									</SelectItem>
									<SelectItem value="parbat">
										Parbat
									</SelectItem>
									<SelectItem value="parsa">Parsa</SelectItem>
									<SelectItem value="pyuthan">
										Pyuthan
									</SelectItem>
									<SelectItem value="ramechhap">
										Ramechhap
									</SelectItem>
									<SelectItem value="rasuwa">
										Rasuwa
									</SelectItem>
									<SelectItem value="rautahat">
										Rautahat
									</SelectItem>
									<SelectItem value="rolpa">Rolpa</SelectItem>
									<SelectItem value="rukum">Rukum</SelectItem>
									<SelectItem value="rupandehi">
										Rupandehi
									</SelectItem>
									<SelectItem value="salyan">
										Salyan
									</SelectItem>
									<SelectItem value="sankhuwasabha">
										Sankhuwasabha
									</SelectItem>
									<SelectItem value="saptari">
										Saptari
									</SelectItem>
									<SelectItem value="sarlahi">
										Sarlahi
									</SelectItem>
									<SelectItem value="sindhuli">
										Sindhuli
									</SelectItem>
									<SelectItem value="sindhupalchok">
										Sindhupalchok
									</SelectItem>
									<SelectItem value="siraha">
										Siraha
									</SelectItem>
									<SelectItem value="solukhumbu">
										Solukhumbu
									</SelectItem>
									<SelectItem value="sunsari">
										Sunsari
									</SelectItem>
									<SelectItem value="surkhet">
										Surkhet
									</SelectItem>
									<SelectItem value="syangja">
										Syangja
									</SelectItem>
									<SelectItem value="tanahu">
										Tanahu
									</SelectItem>
									<SelectItem value="taplejung">
										Taplejung
									</SelectItem>
									<SelectItem value="terhathum">
										Terhathum
									</SelectItem>
									<SelectItem value="udayapur">
										Udayapur
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="citizenshipDoc"
								className="text-blue-700"
							>
								Citizenship Doc
							</Label>
							<div className="flex items-center gap-2">
								<Input
									id="citizenshipDoc"
									type="file"
									className="border-blue-200 focus:border-blue-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="propertyDoc"
								className="text-blue-700"
							>
								Property Doc
							</Label>
							<div className="flex items-center gap-2">
								<Input
									id="propertyDoc"
									type="file"
									className="border-blue-200 focus:border-blue-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
								/>
							</div>
						</div>

						<Button
							type="submit"
							className="w-full bg-blue-600 hover:bg-blue-700"
						>
							Register
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
