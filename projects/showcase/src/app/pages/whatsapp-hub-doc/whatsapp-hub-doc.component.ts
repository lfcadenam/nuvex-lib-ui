import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from 'nuvex-ui/logo';

type TabId = 'overview' | 'mcp' | 'api' | 'simulator';
type CodeLang = 'curl' | 'php' | 'typescript' | 'python';

interface WhatsAppTemplateOption {
  id: string;
  name: string;
  lang: string;
  headerType: 'text' | 'document' | 'image' | 'none';
  headerPreview?: string;
  bodyPreview: (vars: string[]) => string;
  hasButton: boolean;
  buttonLabel?: string;
  defaultVars: string[];
}

@Component({
  selector: 'app-whatsapp-hub-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, LogoComponent],
  templateUrl: './whatsapp-hub-doc.component.html',
  styleUrl: './whatsapp-hub-doc.component.css',
})
export class WhatsAppHubDocComponent {
  readonly activeTab = signal<TabId>('overview');
  readonly activeLang = signal<CodeLang>('curl');
  readonly copiedCode = signal<string | null>(null);

  // --- Estado del Simulador Interactivo ---
  readonly templates: WhatsAppTemplateOption[] = [
    {
      id: 'confirmacion_cita',
      name: 'Confirmación de Cita / Servicio',
      lang: 'es',
      headerType: 'text',
      headerPreview: '🏥 Nuvex Cloud Health',
      bodyPreview: (v) =>
        `Hola *${v[0] || 'Cliente'}*, te confirmamos tu cita #${v[1] || '10452'} para el servicio *${v[2] || 'Consulta General'}* programada para el *${v[3] || '15 de Noviembre a las 10:30 AM'}*.\n\nPor favor preséntate 10 minutos antes.`,
      hasButton: true,
      buttonLabel: 'Ver Detalle de Cita',
      defaultVars: ['Carlos Mendoza', '10452', 'Consulta Médica', '18 de Noviembre a las 09:00 AM'],
    },
    {
      id: 'actualizacion_pedido',
      name: 'Actualización de Pedido (E-Commerce)',
      lang: 'es',
      headerType: 'document',
      headerPreview: '📄 Factura_Venta_NVX-8921.pdf',
      bodyPreview: (v) =>
        `¡Buenas noticias *${v[0] || 'Cliente'}*! Tu pedido *#${v[1] || 'ORD-9821'}* ha sido despachado por mensajería express.\n\n*Guía de Rastreo:* ${v[2] || 'ENV-993821-CO'}\n*Entrega estimada:* ${v[3] || 'Mañana en la tarde'}.`,
      hasButton: true,
      buttonLabel: 'Rastrear Envío en Vivo',
      defaultVars: ['Diana Morales', 'ORD-9821', 'ENV-993821-CO', 'Mañana antes de las 4 PM'],
    },
    {
      id: 'alerta_seguridad',
      name: 'Alerta / Código de Verificación OTP',
      lang: 'es',
      headerType: 'none',
      bodyPreview: (v) =>
        `Tu código de seguridad Nuvex es *${v[0] || '482-910'}*. Es válido por 10 minutos.\n\nSi no realizaste esta solicitud en la plataforma, por favor ignora este mensaje.`,
      hasButton: false,
      defaultVars: ['842-195'],
    },
  ];

  readonly selectedTemplateId = signal<string>('confirmacion_cita');
  readonly simRecipient = signal<string>('573001234567');
  readonly simVar1 = signal<string>('Carlos Mendoza');
  readonly simVar2 = signal<string>('10452');
  readonly simVar3 = signal<string>('Consulta Médica');
  readonly simVar4 = signal<string>('18 de Noviembre a las 09:00 AM');

  readonly currentTemplate = computed(() => {
    return (
      this.templates.find((t) => t.id === this.selectedTemplateId()) ??
      this.templates[0]
    );
  });

  readonly simulatedBodyText = computed(() => {
    const t = this.currentTemplate();
    const vars = [this.simVar1(), this.simVar2(), this.simVar3(), this.simVar4()];
    return t.bodyPreview(vars);
  });

  readonly generatedPayload = computed(() => {
    const t = this.currentTemplate();
    const payload: Record<string, any> = {
      to: this.simRecipient(),
      template: t.id,
      lang: t.lang,
      variables:
        t.id === 'alerta_seguridad'
          ? [this.simVar1()]
          : [this.simVar1(), this.simVar2(), this.simVar3(), this.simVar4()],
    };

    if (t.hasButton) {
      payload['buttons'] = [this.simVar2()];
    }

    if (t.headerType === 'document') {
      payload['header'] = {
        type: 'document',
        url: 'https://cdn.nuvex-tecnologia.com/docs/factura_ejemplo.pdf',
        filename: 'Factura_Venta_NVX-8921.pdf',
      };
    } else if (t.headerType === 'text') {
      payload['header'] = {
        type: 'text',
        text: 'Nuvex Cloud Health',
      };
    }

    return JSON.stringify(payload, null, 2);
  });

  onTemplateChange(id: string) {
    this.selectedTemplateId.set(id);
    const found = this.templates.find((t) => t.id === id);
    if (found && found.defaultVars) {
      this.simVar1.set(found.defaultVars[0] || '');
      this.simVar2.set(found.defaultVars[1] || '');
      this.simVar3.set(found.defaultVars[2] || '');
      this.simVar4.set(found.defaultVars[3] || '');
    }
  }

  copyToClipboard(text: string, key: string) {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      this.copiedCode.set(key);
      setTimeout(() => this.copiedCode.set(null), 2500);
    }
  }

  copyActiveSnippet() {
    let snippet = this.curlSnippet;
    if (this.activeLang() === 'php') snippet = this.phpSnippet;
    else if (this.activeLang() === 'typescript') snippet = this.tsSnippet;
    else if (this.activeLang() === 'python') snippet = this.pythonSnippet;

    this.copyToClipboard(snippet, this.activeLang());
  }

  formatWaText(raw: string): string {
    if (!raw) return '';
    return raw
      .replace(/\n/g, '<br>')
      .replace(/\*(.*?)\*/g, '<strong>$1</strong>');
  }

  readonly mcpConfigSnippet = `{
  "mcpServers": {
    "whatsapp-notifier": {
      "command": "node",
      "args": [
        "d:/Users/Usuario/Documents/Nuvex/whatsapp-notify-mcp/dist/index.js"
      ],
      "env": {
        "META_WHATSAPP_TOKEN": "EAAQ...",
        "META_PHONE_NUMBER_ID": "489201928372",
        "API_KEYS": "nuvex-secret-key-1,cliente-storecontrol-key"
      }
    }
  }
}`;

  readonly curlSnippet = `curl -X POST http://localhost:3005/notify \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: TU_API_KEY_GENERADA" \\
  -d '{
    "to": "573001234567",
    "template": "confirmacion_cita",
    "lang": "es",
    "variables": ["Carlos Mendoza", "10452", "Consulta Médica", "18 de Noviembre a las 09:00 AM"],
    "buttons": ["10452"]
  }'`;

  readonly phpSnippet = `<?php
// Ejemplo en PHP nativo o controlador Laravel
$payload = [
    "to"        => "573001234567",
    "template"  => "confirmacion_cita",
    "lang"      => "es",
    "variables" => [
        $cliente->nombre,
        (string)$cita->id,
        $servicio->nombre,
        $cita->fecha_formateada
    ],
    "buttons"   => [(string)$cita->id]
];

$ch = curl_init("http://localhost:3005/notify");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "x-api-key: " . config('services.nuvex_whatsapp.key')
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    Log::info("WhatsApp enviado con éxito", json_decode($response, true));
}`;

  readonly tsSnippet = `import axios from 'axios';

interface WhatsAppNotificationPayload {
  to: string;
  template: string;
  lang?: string;
  variables?: string[];
  buttons?: string[];
  header?: {
    type: 'document' | 'image' | 'text';
    url?: string;
    filename?: string;
    text?: string;
  };
}

export async function sendWhatsAppAlert(payload: WhatsAppNotificationPayload) {
  const response = await axios.post('http://localhost:3005/notify', payload, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NUVEX_WHATSAPP_API_KEY,
    },
  });

  return response.data; // { success: true, messageId: 'wamid.HBgM...' }
}`;

  readonly pythonSnippet = `import os
import requests

def send_whatsapp_notification(phone: str, template: str, variables: list):
    url = "http://localhost:3005/notify"
    headers = {
        "Content-Type": "application/json",
        "x-api-key": os.getenv("NUVEX_WHATSAPP_API_KEY")
    }
    payload = {
        "to": phone,
        "template": template,
        "lang": "es",
        "variables": variables
    }
    
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    return response.json()`;
}

