import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { RequestWithAdmin } from "../../common/interfaces/admin.interface";
export declare class PagesController {
    private readonly pagesService;
    constructor(pagesService: PagesService);
    findAll(siteId: string, req: RequestWithAdmin): Promise<{
        id: string;
        slug: string;
        title: string;
        description: string | null;
        published: boolean;
        isLanding: boolean;
        version: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(siteId: string, slug: string, req: RequestWithAdmin): Promise<{
        id: string;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        published: boolean;
        isLanding: boolean;
        version: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(siteId: string, dto: CreatePageDto, req: RequestWithAdmin): Promise<{
        id: string;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        published: boolean;
        isLanding: boolean;
        version: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(siteId: string, slug: string, dto: UpdatePageDto, req: RequestWithAdmin): Promise<{
        id: string;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        published: boolean;
        isLanding: boolean;
        version: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    publish(siteId: string, slug: string, req: RequestWithAdmin): Promise<{
        id: string;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        published: boolean;
        isLanding: boolean;
        version: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    unpublish(siteId: string, slug: string, req: RequestWithAdmin): Promise<{
        id: string;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        published: boolean;
        isLanding: boolean;
        version: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    duplicate(siteId: string, slug: string, req: RequestWithAdmin): Promise<{
        id: string;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        published: boolean;
        isLanding: boolean;
        version: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(siteId: string, slug: string, req: RequestWithAdmin): Promise<{
        message: string;
    }>;
}
