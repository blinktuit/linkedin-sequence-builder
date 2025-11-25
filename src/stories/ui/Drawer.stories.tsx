import type { Meta, StoryObj } from "@storybook/react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Send,
  Eye,
  MessageSquare,
  ThumbsUp,
  Phone,
  Code,
  Sparkles,
  Plus,
} from "lucide-react";

const meta: Meta<typeof Drawer> = {
  title: "UI/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Titel</DrawerTitle>
          <DrawerDescription>
            Dit is een beschrijving van de drawer.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p>Drawer content hier</p>
        </div>
        <DrawerFooter>
          <Button>Opslaan</Button>
          <DrawerClose asChild>
            <Button variant="outline">Annuleren</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const StepLibrary: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Stap toevoegen
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Kies een stap</DrawerTitle>
          <DrawerDescription>
            Selecteer het type actie dat je wilt toevoegen
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                LinkedIn Acties
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 text-left">
                  <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                    <Send className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Uitnodiging</div>
                    <div className="text-xs text-muted-foreground">
                      Stuur connectie verzoek
                    </div>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 text-left">
                  <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                    <Eye className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Profiel bezoek</div>
                    <div className="text-xs text-muted-foreground">
                      Bekijk hun profiel
                    </div>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 text-left">
                  <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Bericht</div>
                    <div className="text-xs text-muted-foreground">
                      Stuur een DM
                    </div>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 text-left">
                  <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                    <ThumbsUp className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Like post</div>
                    <div className="text-xs text-muted-foreground">
                      Like hun recente post
                    </div>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 text-left">
                  <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Voice</div>
                    <div className="text-xs text-muted-foreground">
                      Stuur voice bericht
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Integraties
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 text-left">
                  <div className="h-8 w-8 rounded-md bg-purple-100 flex items-center justify-center">
                    <Code className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">API Call</div>
                    <div className="text-xs text-muted-foreground">
                      Webhook trigger
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                AI
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 text-left">
                  <div className="h-8 w-8 rounded-md bg-amber-100 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Generate</div>
                    <div className="text-xs text-muted-foreground">
                      AI variabele
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Bewerken</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Profiel bewerken</DrawerTitle>
          <DrawerDescription>
            Wijzig je profielgegevens hieronder
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Naam</label>
            <input
              type="text"
              className="w-full h-10 px-3 rounded-md border"
              defaultValue="Jan Jansen"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full h-10 px-3 rounded-md border"
              defaultValue="jan@example.com"
            />
          </div>
        </div>
        <DrawerFooter>
          <Button>Opslaan</Button>
          <DrawerClose asChild>
            <Button variant="outline">Annuleren</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
