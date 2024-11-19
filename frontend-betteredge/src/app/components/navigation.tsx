import {
NavigationMenu,
NavigationMenuContent,
NavigationMenuIndicator,
NavigationMenuItem,
NavigationMenuLink,
NavigationMenuList,
NavigationMenuTrigger,
navigationMenuTriggerStyle,
NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from "next/link"

export const Navigation = () => {
return(
<NavigationMenu className="border-b border-gray-700 w-full">
    <NavigationMenuList>

    <h1 className="text-2xl font-bold">
          Case BetterEdge
        </h1>
        

    <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>


        <NavigationMenuItem>
            <Link href="/clientes" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Clientes
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
            <Link href="/ativos" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Ativos
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>

    </NavigationMenuList>

</NavigationMenu>
)
}
