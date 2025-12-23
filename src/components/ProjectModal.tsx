"use client"
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { toast } from "sonner";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  // Função para formatar o telefone (Máscara Brasileira)
  const formatPhone = (value: string) => {
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, "");

    // Limita a 11 dígitos (DDD + 9 números)
    const truncated = numbers.substring(0, 11);

    // Aplica a máscara progressivamente
    if (truncated.length === 0) return "";
    
    // (DD
    if (truncated.length <= 2) return `(${truncated}`;
    
    // (DD) 9999
    if (truncated.length <= 6) return `(${truncated.substring(0, 2)}) ${truncated.substring(2)}`;
    
    // (DD) 9999-9999 (Fixo)
    if (truncated.length <= 10) {
      return `(${truncated.substring(0, 2)}) ${truncated.substring(2, 6)}-${truncated.substring(6)}`;
    }
    
    // (DD) 99999-9999 (Celular)
    return `(${truncated.substring(0, 2)}) ${truncated.substring(2, 7)}-${truncated.substring(7)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = `
Olá! Meu nome é ${name}.
Vim pelo Instagram e gostaria de conversar sobre o desenvolvimento de uma solução digital para o meu negócio.

📧 E-mail: ${email}
📱 Telefone: ${phone || "Não informado"}

${description}

Podemos falar?
    `.trim();

    const whatsappUrl = `https://api.whatsapp.com/send?phone=5531984056082&text=${encodeURIComponent(
      message
    )}`;

    // Abre em nova aba
    window.open(whatsappUrl, "_blank");

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Solicitação enviada com sucesso! Entraremos em contato em breve.");
      onClose();
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125 bg-background border-border rounded-none">
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-2xl text-primary">
            Iniciar Projeto
          </DialogTitle>
          <DialogDescription className="font-mono text-xs uppercase tracking-widest">
            Conte-nos sobre sua visão e vamos torná-la real.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="font-mono text-[10px] uppercase tracking-widest"
            >
              Nome Completo
            </Label>
            <Input
              id="name"
              placeholder="Seu nome"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-none border-border focus-visible:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="font-mono text-[10px] uppercase tracking-widest"
              >
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-none border-border focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="font-mono text-[10px] uppercase tracking-widest"
              >
                WhatsApp / Telefone
              </Label>
              <Input
                id="phone"
                placeholder="(00) 00000-0000"
                value={phone}
                onChange={handlePhoneChange} 
                maxLength={15}
                className="rounded-none border-border focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="font-mono text-[10px] uppercase tracking-widest"
            >
              Descrição do Projeto
            </Label>
            <Textarea
              id="description"
              placeholder="Descreva brevemente o que você precisa..."
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-none border-border focus-visible:ring-primary min-h-25"
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-black hover:bg-primary/90 rounded-none font-bold py-6"
            >
              {isSubmitting ? "ENVIANDO..." : "ENVIAR SOLICITAÇÃO"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}