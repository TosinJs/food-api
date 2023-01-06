import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreateAddonDto } from 'src/brands/dto/addons/create-addon.dto';
import { UpdateAddonDto } from 'src/brands/dto/addons/update-addon.dto';
import { AddonsService } from 'src/brands/services/addons/addons.service';
import { createSuccessResponse } from 'src/utils/responseBuilder.utils';

@Controller('brands/:brandId/addons')
export class AddonsController {
    constructor(private readonly addonService: AddonsService) {}

    @Post()
    async create(
        @Param('brandId') brandId: string,
        @Body() createAddonDto: CreateAddonDto
        ) {
        return createSuccessResponse(
            HttpStatus.CREATED,
            'Success',
            await this.addonService.create(brandId, createAddonDto)
        )
    }

    @Get()
    async findAll(@Param('brandId') brandId: string) {
        return createSuccessResponse(
            HttpStatus.OK,
            'Success',
            await this.addonService.findAll(brandId)
        )
    }

    @Get(':addonId')
    async findOne(@Param('addonId') addonId: string) {
        const addon = await this.addonService.findOne(addonId)
        if (!addon) {
            throw new HttpException(
                'addon not found',
                HttpStatus.NOT_FOUND,
                { cause: new Error('Addon Not Found') }
            )
        }
        return createSuccessResponse(HttpStatus.OK, 'Success', addon)
    }

    @Patch(':addonId')
    async update(
        @Param('brandId') brandId: string,
        @Param('addonId') addonId: string,
        @Body() updateAddonDto: UpdateAddonDto
    ) {
        const res = await this.addonService.update(brandId, addonId, updateAddonDto)
        if (res == 0) {
            throw new HttpException(
                'invalid brandId or user id - update failed',
                HttpStatus.BAD_REQUEST,
                { cause: new Error('Failed to Update Addon') }
            )
        }
        return createSuccessResponse(HttpStatus.OK, 'Success', res)
    }

    @Delete(':addonId')
    async delete(@Param('addonId') addonId: string) {
        const res = await this.addonService.delete(addonId)
        if (res == 0) {
            throw new HttpException(
                'invalid brandId or user id - update failed',
                HttpStatus.BAD_REQUEST,
                { cause: new Error('Failed to Update Addon') }
            )
        }
        return createSuccessResponse(HttpStatus.OK, 'Success', res)
    }
}