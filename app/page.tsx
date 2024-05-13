"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import { send } from "@emailjs/browser";
import { init } from "@emailjs/browser";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <AboutUs />
      <Processes />
      <Contact />
      <Footer />
    </main>
  );
}

function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      // if scroll down hide the navbar
      setShow(false);
    } else {
      // if scroll up show the navbar
      setShow(true);
    }

    // remember current page location to use in the next move
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    // cleanup function
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  let linkName =
    "hidden md:block text-lg w-24 text-center h-fit text-gray-200 hover:text-white";

  return (
    <div
      className={`fixed ${
        show ? "top-0 md:top-4" : "-top-20"
      } left-0 right-0 z-50 mx-auto h-20 max-w-[900px] bg-black/70 backdrop-blur-lg transition-all md:rounded-full`}
    >
      <div className="flex h-full items-center justify-center font-poppins text-white md:space-x-6">
        <Link href="#home" className={linkName} scroll={true}>
          Home
        </Link>
        <Link href="#about" className={linkName} scroll={true}>
          About
        </Link>
        <Link href="#home" scroll={true}>
          <Image
            src="/resources/logos/OG-logo-white.png"
            className="mx-8 h-12 w-auto pr-2"
            alt="Origin Golf Logo"
            width={256}
            height={62}
            priority
          />
        </Link>
        <Link href="#process" className={linkName} scroll={true}>
          Process
        </Link>
        <Link href="#contact" className={linkName} scroll={true}>
          Contact
        </Link>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div
      id="home"
      className="flex h-screen w-full bg-black bg-[url('/resources/backgrounds/suite-2.jpg')] bg-cover bg-fixed"
    >
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ease: "easeInOut", duration: 0.4 }}
        className="m-auto h-fit w-full bg-black bg-center px-4 text-center align-middle text-white sm:h-[400px] sm:max-w-[600px] sm:px-0"
      >
        <h2 className="mx-auto mt-12 w-full font-poppins text-3xl font-light tracking-tight sm:text-5xl sm:leading-[60px]">
          Decades of experience designing and manufacturing finely milled golf
          putters.
        </h2>
        <a href="#about">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48px"
            viewBox="0 -960 960 960"
            width="48px"
            fill="#ffffff"
            className="mx-auto mb-10 mt-4 fill-gray-400 transition-colors hover:cursor-pointer hover:fill-white"
          >
            <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
          </svg>
        </a>
      </motion.div>
    </div>
  );
}

function AboutUs() {
  return (
    <div
      className="relative w-full bg-black px-4 pb-32 pt-16 lg:px-0 lg:py-32"
      id="about"
    >
      <div className="relative mx-auto w-fit lg:h-[700px] lg:w-[900px]">
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", duration: 0.4 }}
          className="relative z-20 h-fit max-w-[600px] space-y-12 px-2 font-poppins font-light text-white md:right-0 lg:absolute lg:top-48"
        >
          <div>
            <div className="aspect-[2] lg:hidden"></div>
            <h3 className="mb-2 text-3xl font-medium tracking-tight sm:text-5xl">
              Who we are
            </h3>
            <p className="text-lg leading-8">
              Origin Golf is a milled putter design and CNC machine production
              studio. We turn ideas into conceptual designs and fulfill
              production based on the needs and desires of each individual
              client.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-3xl font-medium tracking-tight sm:text-5xl">
              Kevin Peterson
            </h3>
            <p className="text-lg leading-8">
              Kevin Peterson, owner of Origin Golf, has been exclusively milling
              fine putters for almost 30 years and has produced a greater
              variety of styles than probably anyone else in the industry. He
              offers focused service for each of his clients and they appreciate
              the rare talent and experience he possesses. From the designing
              and prototyping aspects, to the precise quality of the finished
              machined products, Origin Golf offers matchless quality and
              experience in milling high-end golf putters.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", duration: 0.4 }}
          className="absolute top-0 z-10"
        >
          <Image
            src="/resources/images/putter.jpg"
            className="aspect-square w-full max-w-[600px] rotate-90 lg:rotate-0"
            alt="Image of a putter"
            width={600}
            height={600}
          />
        </motion.div>
      </div>
    </div>
  );
}

function Processes() {
  const Process = ({
    heading,
    content,
    image,
    alt,
    reverse = false,
  }: {
    heading: string;
    content: string;
    image: string;
    alt: string;
    reverse?: boolean;
  }) => (
    <motion.div
      initial={reverse ? { opacity: 0.5, x: 25 } : { opacity: 0.5, x: -25 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
      className={`mx-auto flex max-w-[600px] flex-col lg:max-w-[900px] lg:flex-row ${
        reverse && "lg:flex-row-reverse"
      } items-center gap-x-10 overflow-x-hidden align-middle font-poppins text-white`}
    >
      <Image
        src={image}
        className="fit mb-4 h-64 w-64 rounded-full border-2 border-gray-900 object-cover"
        alt={alt}
        width={1000}
        height={1000}
      />
      <div className="h-fit px-2">
        <h3 className="font-regular mb-2 text-3xl tracking-tighter sm:text-5xl lg:mb-4">
          {heading}
        </h3>
        <p className="flex-grow text-lg font-light leading-7">{content}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full bg-black py-32" id="process">
      <div className="space-y-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", duration: 0.4 }}
          className="mx-auto h-fit max-w-[600px] px-4 text-center font-poppins text-3xl font-medium tracking-tight text-white sm:text-5xl"
        >
          We take care of every step of the process
        </motion.h2>
        <Process
          heading="Designing"
          content="Computer models, from simple to high complex assemblies, allow clients to see their product in a 3D view, allowing them to discover the weight of the finished putter in various materials, which is critical in the golf industry."
          image="/resources/pictures/01.jpg"
          alt="A computer model of a putter"
        />
        <Process
          heading="Prototyping"
          content="Prototypes are available as quick and inexpensive SLA plastic models to exact functioning milled models. Milled putters can be produced using a variety of avenues including 100% milled designs from a block of material, milling from forgings, and/or castings."
          image="/resources/pictures/02.jpg"
          alt="A prototype of a putter"
          reverse
        />
        <Process
          heading="CNC Milling"
          content="Our passion for technology keeps us current with the latest performance methods and our experience with high-end putter production is unmatched in the industry. Every detail is flawlessly milled from the putter itself to the engraving and face mill design work."
          image="/resources/pictures/03.jpg"
          alt="A Peterson Fine Mill putter"
        />
        <Process
          heading="Production"
          content="We are located in one of the largest golf manufacturing areas in the world and work closely with other vendors who serve in finishing the product, making the production process seamless from start to finish."
          reverse
          image="/resources/pictures/04.jpg"
          alt="An assortment of putters"
        />
      </div>
    </div>
  );
}

function Contact() {
  init({
    publicKey: "rh-c3U2fhvo1jb1rz",
  });

  type ContactFormType = {
    name: string;
    email: string;
    message: string;
    token: string;
  };

  const ContactFormSchema = z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(1, "Name is required"),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Email is invalid" }),
    message: z
      .string({ required_error: "Message is required" })
      .min(30, "Message must be at least 30 characters"),
    token: z
      .string({ required_error: "Verify that you are not a bot" })
      .min(1, { message: "Verify that you are not a bot" }),
  });

  const form = useForm<ContactFormType>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
      token: "",
    },
    resolver: zodResolver(ContactFormSchema),
  });

  const submit = async (data: ContactFormType) => {
    if (data.token) {
      let sent_status = await send(
        "origin_golf_contact",
        "og_contact_template",
        {
          to_name: "Chase",
          from_name: data.name,
          message: data.message,
          from_email: data.email,
          "g-recaptcha-response": data.token,
        },
      );
      if (sent_status.status == 200) {
        setSent(true);
        form.resetField("name");
        form.resetField("email");
        form.resetField("message");
      }
    }
  };

  const onCaptchaChange = (token: string | null) => {
    if (token) {
      form.setValue("token", token);
      form.clearErrors("token");
    } else {
      form.setValue("token", "");
    }
  };

  useEffect(() => {
    form.setValue("token", "");
  }, []);

  const inputStyle = "w-full bg-cool-grey-50 text-cool-grey-900 p-2";
  const errorStyle = "font-poppins text-red-600 font-medium text-lg mt-1";

  const [sent, setSent] = useState(false);

  return (
    <div id="contact" className="w-full bg-black py-32">
      <div className="mb-8">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", duration: 0.4 }}
          className="mx-auto mb-2 max-w-[600px] text-center font-poppins text-3xl font-medium tracking-tight text-white sm:text-5xl"
        >
          Contact us
        </motion.h2>
        {sent && (
          <h3 className="text-center text-lg font-bold text-green-500">
            Your message has been sent!
          </h3>
        )}
      </div>
      <form
        className="mx-auto max-w-[600px] px-2 align-top font-poppins"
        onSubmit={form.handleSubmit(submit)}
      >
        <div className="flex flex-col justify-items-stretch sm:flex-row">
          <div className="mb-4 flex-grow sm:mr-4">
            <h4 className="mb-1 text-lg text-white">Name</h4>
            <input
              className={`${inputStyle}`}
              placeholder="Tiger Woods"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className={errorStyle}>{form.formState.errors.name.message}</p>
            )}
          </div>
          <div className="mb-4 flex-grow">
            <h4 className="mb-1 text-lg text-white">Email</h4>
            <input
              className={`${inputStyle}`}
              placeholder="example@gmail.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className={errorStyle}>
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div className="mb-4 block">
          <h4 className="mb-1 text-lg text-white">Message</h4>
          <textarea
            className={`${inputStyle}`}
            {...form.register("message")}
            placeholder="Hello..."
            rows={12}
          />
          {form.formState.errors.message && (
            <p className={errorStyle}>
              {form.formState.errors.message.message}
            </p>
          )}
        </div>
        <div className="h-32 w-full">
          <div className="sm:float-left">
            <h4 className="mb-1 text-lg text-white">Verify</h4>
            <ReCAPTCHA
              size="normal"
              sitekey="6LcudtcpAAAAANA-1o2IeZ9q2MyhaLJZciuEb3ap"
              onChange={onCaptchaChange}
            />
            {form.formState.errors.token && (
              <p className={errorStyle}>
                {form.formState.errors.token.message}
              </p>
            )}
          </div>
          <div className="sm:float-right">
            <h4 className="invisible mb-1 text-lg text-white">Submit</h4>
            <button
              className="h-[76px] bg-cool-grey-600 px-8 text-cool-grey-50"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Footer() {
  return (
    <div className="w-full bg-black pb-8 pt-32">
      <div className="mx-auto max-w-[900px] text-center text-white">
        <h3 className="font mb-4 text-3xl font-medium tracking-tight sm:text-5xl">
          Origin Golf
        </h3>
        <p className="mb-2 text-lg">
          (760) 599-4499
          <span className="max-[399px]:hidden"> | </span>
          <br className="min-[400px]:hidden" />
          <a href="mailto:kevin@origingolf.com" className="underline">
            kevin@origingolf.com
          </a>
        </p>
        {/* ADDRESS */}
        <p className="mb-2 text-lg leading-5">
          925 Poinsettia Ave, Suite 2<br />
          Vista, CA 92081, United States
        </p>
        <p className="text-lg">© Copyright {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
